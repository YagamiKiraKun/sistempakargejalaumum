export class CertaintyFactor {
    constructor() {
      this.cfResults = {}; // Menyimpan hasil perhitungan CF untuk setiap penyakit
      this.cfTrace = []; // Jejak perhitungan untuk debugging
    }

    reset() {
      this.cfResults = {};
      this.cfTrace = [];
    }
  
    combineRuleCF(cf1, cf2) {

      if (cf1 >= 0 && cf2 >= 0) {
        return cf1 + cf2 * (1 - cf1);
      } else if (cf1 < 0 && cf2 < 0) {
        return cf1 + cf2 * (1 + cf1);
      } else {
        return (cf1 + cf2) / (1 - Math.min(Math.abs(cf1), Math.abs(cf2)));
      }
    }
  
    calculateRuleCF(rule, userInputCF = 1.0) {
      const ruleCF = rule.cf * userInputCF;
      
      this.cfTrace.push(`Rule ${rule.id}: CF ${rule.cf} * Input CF ${userInputCF} = ${ruleCF}`);
      
      return ruleCF;
    }
  
    addRuleCF(ruleCF, conclusion) {
      const key = Object.keys(conclusion)[0]; 
      const value = conclusion[key]; 
      
      const resultKey = `${key}_${value}`; 
      
      if (this.cfResults[resultKey] === undefined) {
        this.cfResults[resultKey] = ruleCF;
        this.cfTrace.push(`Menambahkan ${resultKey}: CF = ${ruleCF}`);
      } else {

        const oldCF = this.cfResults[resultKey];
        const newCF = this.combineRuleCF(oldCF, ruleCF);
        
        this.cfResults[resultKey] = newCF;
        this.cfTrace.push(`Menggabungkan ${resultKey}: CF ${oldCF} + CF ${ruleCF} = ${newCF}`);
      }
      
      return this.cfResults[resultKey];
    }
  
    processRule(rule, userInputCF = 1.0) {
      const ruleCF = this.calculateRuleCF(rule, userInputCF);
      return this.addRuleCF(ruleCF, rule.conclusion);
    }

    processRules(rules, userInputCF = 1.0) {
      for (const rule of rules) {
        this.processRule(rule, userInputCF);
      }
      
      return this.cfResults;
    }

    getResults() {
      return { ...this.cfResults };
    }
  
    getHighestCF() {
      let highestCF = 0;
      let highestResult = null;
      
      for (const [key, value] of Object.entries(this.cfResults)) {
        if (value > highestCF) {
          highestCF = value;
          highestResult = key;
        }
      }
      
      if (highestResult) {
        const [category, result] = highestResult.split('_');
        return {
          category,
          result,
          cf: highestCF
        };
      }
      
      return null;
    }

    getCFByCategory(category) {
      const results = {};
      
      for (const [key, value] of Object.entries(this.cfResults)) {
        const [cat, result] = key.split('_');
        
        if (cat === category) {
          results[result] = value;
        }
      }
      
      return results;
    }

    getHighestCFByCategory(category) {
      const categoryResults = this.getCFByCategory(category);
      let highestCF = 0;
      let highestResult = null;
      
      for (const [result, cf] of Object.entries(categoryResults)) {
        if (cf > highestCF) {
          highestCF = cf;
          highestResult = result;
        }
      }
      
      if (highestResult) {
        return {
          result: highestResult,
          cf: highestCF
        };
      }
      
      return null;
    }

    getTrace() {
      return [...this.cfTrace];
    }
  }
  
  export default CertaintyFactor;