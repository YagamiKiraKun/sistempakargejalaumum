import { Backward } from './Backward';
import { CertaintyFactor } from './CertaintyFactor';
import rules from './rules';

class SistemDiagnosa {
  constructor() {
    this.backward = new Backward(rules);
    this.cfEngine = new CertaintyFactor();
    this.trace = []; 
  }

  reset() {
    this.backward.reset();
    this.cfEngine.reset();
    this.trace = [];
  }

  addFact(name, value) {
    this.backward.addFact(name, value);
    this.trace.push(`Fakta baru: ${name} = ${value}`);
  }

  addFacts(facts) {
    this.backward.addFacts(facts);
    this.trace.push(`Fakta baru ditambahkan: ${JSON.stringify(facts)}`);
  }

  runDiagnosis(goal = "penyakit") {

    this.cfEngine.reset();
    
    const bcResult = this.backward.backward(goal);
    this.trace.push(...this.backward.getInferenceTrace());
    
    if (!bcResult) {
      this.trace.push(`Tidak dapat menentukan ${goal}`);
      return {
        result: null,
        trace: this.trace,
        missingAttributes: this.backward.missingAttributes
      };
    }
    
    // Dapatkan rule yang difire
    const firedRule = bcResult.rule;
    
    // Hitung CF untuk rule yang difire
    const cf = this.cfEngine.processRule(firedRule);
    this.trace.push(...this.cfEngine.getTrace());
    
    return {
      result: {
        value: bcResult.value,
        cf: cf
      },
      trace: this.trace,
      workingMemory: this.backward.getWorkingMemory()
    };
  }

  getResponTubuh() {
    return this.runDiagnosis("respon");
  }

  getEtiologi() {
    return this.runDiagnosis("etiologi");
  }

  getPenyakit() {
    return this.runDiagnosis("penyakit");
  }

  runCompleteDiagnosis(inputGejala) {
    // Reset sistem terlebih dahulu
    this.reset();
    
    // Tambahkan semua fakta yang diberikan
    this.addFacts(inputGejala);
    
    // 1. Dapatkan respon tubuh
    const responResult = this.getResponTubuh();
    if (!responResult.result) {
      return {
        status: "incomplete",
        message: "Tidak dapat menentukan respon tubuh",
        missingAttributes: responResult.missingAttributes,
        trace: this.trace
      };
    }
    
    // 2. Dapatkan etiologi
    const etiologiResult = this.getEtiologi();
    if (!etiologiResult.result) {
      return {
        status: "incomplete",
        message: "Tidak dapat menentukan etiologi",
        missingAttributes: etiologiResult.missingAttributes,
        trace: this.trace
      };
    }
    
    // 3. Dapatkan diagnosa penyakit
    const penyakitResult = this.getPenyakit();
    if (!penyakitResult.result) {
      return {
        status: "incomplete",
        message: "Tidak dapat menentukan penyakit",
        missingAttributes: penyakitResult.missingAttributes,
        trace: this.trace
      };
    }
    
    return {
      status: "complete",
      respon: responResult.result,
      etiologi: etiologiResult.result,
      penyakit: penyakitResult.result,
      workingMemory: penyakitResult.workingMemory,
      trace: this.trace
    };
  }

  getMissingAttributes() {
    return this.backward.missingAttributes;
  }

  getTrace() {
    return [...this.trace];
  }
}

export default SistemDiagnosa;