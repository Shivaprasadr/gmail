#!/usr/bin/env node

/**
 * Configuration Validator for Gmail Cleanup System
 * 
 * This script validates the senders.json configuration file to ensure:
 * - JSON is valid
 * - Required fields are present
 * - Email addresses are valid format
 * - No duplicate senders
 * - Enabled senders have complete configuration
 */

const fs = require('fs');
const path = require('path');

class ConfigValidator {
  constructor() {
    this.errors = [];
    this.warnings = [];
    this.config = null;
  }

  /**
   * Validate email address format
   */
  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Validate individual sender configuration
   */
  validateSender(sender, index) {
    const requiredFields = ['email', 'description', 'category', 'enabled', 'addedDate'];
    
    // Check required fields
    for (const field of requiredFields) {
      if (!sender.hasOwnProperty(field)) {
        this.errors.push(`Sender ${index + 1}: Missing required field '${field}'`);
      }
    }

    // Validate email format
    if (sender.email && !this.isValidEmail(sender.email)) {
      this.errors.push(`Sender ${index + 1}: Invalid email format '${sender.email}'`);
    }

    // Validate boolean fields
    if (sender.enabled !== undefined && typeof sender.enabled !== 'boolean') {
      this.errors.push(`Sender ${index + 1}: 'enabled' must be a boolean value`);
    }

    // Validate date format
    if (sender.addedDate && isNaN(Date.parse(sender.addedDate))) {
      this.warnings.push(`Sender ${index + 1}: Invalid date format '${sender.addedDate}'`);
    }

    // Check for empty strings
    if (sender.email === '') {
      this.errors.push(`Sender ${index + 1}: Email address cannot be empty`);
    }

    if (sender.description === '') {
      this.warnings.push(`Sender ${index + 1}: Description is empty`);
    }
  }

  /**
   * Check for duplicate senders
   */
  validateDuplicates(senders) {
    const emailMap = new Map();
    
    senders.forEach((sender, index) => {
      if (sender.email) {
        const email = sender.email.toLowerCase();
        if (emailMap.has(email)) {
          this.errors.push(`Duplicate sender found: '${sender.email}' at positions ${emailMap.get(email) + 1} and ${index + 1}`);
        } else {
          emailMap.set(email, index);
        }
      }
    });
  }

  /**
   * Validate categories configuration
   */
  validateCategories(categories, senders) {
    if (!categories) {
      this.warnings.push('No categories configuration found');
      return;
    }

    // Get all categories used by senders
    const usedCategories = new Set(senders.map(s => s.category).filter(c => c));
    
    // Check if all used categories are defined
    usedCategories.forEach(category => {
      if (!categories[category]) {
        this.warnings.push(`Category '${category}' is used by senders but not defined in categories section`);
      }
    });

    // Check for unused categories
    Object.keys(categories).forEach(category => {
      if (!usedCategories.has(category)) {
        this.warnings.push(`Category '${category}' is defined but not used by any senders`);
      }
    });
  }

  /**
   * Validate overall configuration structure
   */
  validateStructure(config) {
    if (!config.senders || !Array.isArray(config.senders)) {
      this.errors.push('Configuration must have a \'senders\' array');
      return false;
    }

    if (config.senders.length === 0) {
      this.warnings.push('Senders array is empty - no cleanup will be performed');
    }

    return true;
  }

  /**
   * Generate statistics about the configuration
   */
  generateStats(config) {
    if (!config.senders) return {};

    const totalSenders = config.senders.length;
    const enabledSenders = config.senders.filter(s => s.enabled).length;
    const disabledSenders = totalSenders - enabledSenders;
    
    const categories = {};
    config.senders.forEach(sender => {
      if (sender.category) {
        categories[sender.category] = (categories[sender.category] || 0) + 1;
      }
    });

    return {
      totalSenders,
      enabledSenders,
      disabledSenders,
      categories
    };
  }

  /**
   * Main validation method
   */
  validate() {
    try {
      console.log('🔍 Validating Gmail cleanup configuration...\n');

      // Load configuration file
      const configPath = path.join(__dirname, '..', 'config', 'senders.json');
      
      if (!fs.existsSync(configPath)) {
        this.errors.push('Configuration file not found: config/senders.json');
        return this.reportResults();
      }

      const configData = fs.readFileSync(configPath, 'utf8');
      
      try {
        this.config = JSON.parse(configData);
      } catch (parseError) {
        this.errors.push(`Invalid JSON format: ${parseError.message}`);
        return this.reportResults();
      }

      // Validate structure
      if (!this.validateStructure(this.config)) {
        return this.reportResults();
      }

      // Validate each sender
      this.config.senders.forEach((sender, index) => {
        this.validateSender(sender, index);
      });

      // Check for duplicates
      this.validateDuplicates(this.config.senders);

      // Validate categories
      this.validateCategories(this.config.categories, this.config.senders);

      // Report results
      return this.reportResults();

    } catch (error) {
      this.errors.push(`Validation error: ${error.message}`);
      return this.reportResults();
    }
  }

  /**
   * Report validation results
   */
  reportResults() {
    const stats = this.generateStats(this.config);
    
    console.log('📊 CONFIGURATION STATISTICS');
    console.log('==========================');
    console.log(`📧 Total senders: ${stats.totalSenders}`);
    console.log(`✅ Enabled senders: ${stats.enabledSenders}`);
    console.log(`❌ Disabled senders: ${stats.disabledSenders}`);
    
    if (Object.keys(stats.categories).length > 0) {
      console.log('\n📂 Categories:');
      Object.entries(stats.categories).forEach(([category, count]) => {
        console.log(`   ${category}: ${count} senders`);
      });
    }

    console.log('\n🔍 VALIDATION RESULTS');
    console.log('=====================');

    if (this.errors.length === 0 && this.warnings.length === 0) {
      console.log('✅ Configuration is valid and ready to use!');
      
      if (stats.enabledSenders > 0) {
        console.log(`\n🚀 Cleanup will process ${stats.enabledSenders} enabled senders:`);
        this.config.senders
          .filter(s => s.enabled)
          .forEach(sender => {
            console.log(`   📧 ${sender.email} (${sender.category})`);
          });
      }
      
      return true;
    }

    // Report errors
    if (this.errors.length > 0) {
      console.log(`\n❌ ERRORS (${this.errors.length}):`);
      this.errors.forEach((error, index) => {
        console.log(`${index + 1}. ${error}`);
      });
    }

    // Report warnings
    if (this.warnings.length > 0) {
      console.log(`\n⚠️  WARNINGS (${this.warnings.length}):`);
      this.warnings.forEach((warning, index) => {
        console.log(`${index + 1}. ${warning}`);
      });
    }

    // Summary
    console.log('\n📋 SUMMARY');
    console.log('==========');
    if (this.errors.length > 0) {
      console.log(`❌ Configuration has ${this.errors.length} error(s) that must be fixed`);
      console.log('🔧 Please fix the errors above before running the cleanup');
      return false;
    } else {
      console.log('✅ Configuration is valid (with warnings)');
      console.log('⚠️  Please review the warnings above');
      return true;
    }
  }
}

// Run validation if called directly
if (require.main === module) {
  const validator = new ConfigValidator();
  const isValid = validator.validate();
  process.exit(isValid ? 0 : 1);
}

module.exports = ConfigValidator;
