export class CertaintyFactor {
    constructor() {
      this.cfResults = {}; // Menyimpan hasil perhitungan CF untuk setiap penyakit
      this.cfTrace = []; // Jejak perhitungan untuk debugging
    }
  
    // Reset engine
    reset() {
      this.cfResults = {};
      this.cfTrace = [];
    }
  
    combineRuleCF(cf1, cf2) {
      // Penggabungan cf dengan operator logika AND
      if (cf1 >= 0 && cf2 >= 0) {
        return cf1 + cf2 * (1 - cf1);
      } else if (cf1 < 0 && cf2 < 0) {
        return cf1 + cf2 * (1 + cf1);
      } else {
        return (cf1 + cf2) / (1 - Math.min(Math.abs(cf1), Math.abs(cf2)));
      }
    }
  
    // Menghitung CF untuk rule yang terpicu
    calculateRuleCF(rule, userInputCF = 1.0) {
      // Mengalikan CF rule dengan CF masukan pengguna
      const ruleCF = rule.cf * userInputCF;
      
      this.cfTrace.push(`Rule ${rule.id}: CF ${rule.cf} * Input CF ${userInputCF} = ${ruleCF}`);
      
      return ruleCF;
    }
  
    // Menambahkan hasil CF dari rule yang terpicu
    addRuleCF(ruleCF, conclusion) {
      const key = Object.keys(conclusion)[0]; // Misal: "penyakit"
      const value = conclusion[key]; // Misal: "ISPA"
      
      const resultKey = `${key}_${value}`; // Misal: "penyakit_ISPA"
      
      if (this.cfResults[resultKey] === undefined) {
        this.cfResults[resultKey] = ruleCF;
        this.cfTrace.push(`Menambahkan ${resultKey}: CF = ${ruleCF}`);
      } else {
        // Jika sudah ada, gabungkan CF
        const oldCF = this.cfResults[resultKey];
        const newCF = this.combineRuleCF(oldCF, ruleCF);
        
        this.cfResults[resultKey] = newCF;
        this.cfTrace.push(`Menggabungkan ${resultKey}: CF ${oldCF} + CF ${ruleCF} = ${newCF}`);
      }
      
      return this.cfResults[resultKey];
    }
  
    // Proses perhitungan CF untuk rule yang terpicu
    processRule(rule, userInputCF = 1.0) {
      const ruleCF = this.calculateRuleCF(rule, userInputCF);
      return this.addRuleCF(ruleCF, rule.conclusion);
    }
  
    // Proses perhitungan CF untuk beberapa rule yang terpicu
    processRules(rules, userInputCF = 1.0) {
      for (const rule of rules) {
        this.processRule(rule, userInputCF);
      }
      
      return this.cfResults;
    }
  
    // Dapatkan hasil CF terakhir
    getResults() {
      return { ...this.cfResults };
    }
  
    // Dapatkan hasil CF tertinggi
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
  
    // Dapatkan hasil CF untuk kategori tertentu (misal: "penyakit")
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
  
    // Dapatkan hasil CF tertinggi untuk kategori tertentu
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
  
    // Dapatkan trace perhitungan CF
    getTrace() {
      return [...this.cfTrace];
    }
  }
  
  export default CertaintyFactor;