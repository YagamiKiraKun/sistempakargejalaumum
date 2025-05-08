// backwardEngine.js
export class Backward {
    constructor(rules) {
      this.rules = rules;
      this.workingMemory = {}; // Fakta yang diketahui
      this.inferenceTrace = []; // Jejak inferensi untuk debugging
      this.missingAttributes = []; // Atribut yang masih perlu ditanyakan
      this.goalStack = []; // Stack untuk tujuan yang ingin dicapai
    }
  
    reset() {
      this.workingMemory = {};
      this.inferenceTrace = [];
      this.missingAttributes = [];
      this.goalStack = [];
    }
  
    addFact(name, value) {
      this.workingMemory[name] = value;
      this.inferenceTrace.push(`Fakta baru: ${name} = ${value}`);
    }

    addFacts(facts) {
      for (const [key, value] of Object.entries(facts)) {
        this.workingMemory[key] = value;
      }
      this.inferenceTrace.push(`Fakta baru ditambahkan: ${JSON.stringify(facts)}`);
    }
  
    // Mencari rules yang kesimpulannya mengandung goal yang dicari
    findRulesForGoal(goal) {
      return this.rules.filter(rule => {
        const conclusion = rule.conclusion;
        return conclusion && Object.keys(conclusion)[0] === goal;
      });
    }

    canFireRule(rule) {
      try {
        return rule.premise(this.workingMemory);
      } catch (error) {
        return false;
      }
    }

    getMissingPremises(rule) {
      const missingAttributes = [];

      const conditionParts = rule.condition.split("AND").map(part => part.trim());
      
      for (const part of conditionParts) {
        const [attribute] = part.split("=").map(p => p.trim());
        if (this.workingMemory[attribute] === undefined) {
          missingAttributes.push(attribute);
        }
      }
      
      return missingAttributes;
    }

    backward(goal) {
      this.inferenceTrace.push(`Mencari: ${goal}`);
      this.goalStack.push(goal);

      if (this.workingMemory[goal] !== undefined) {
        this.inferenceTrace.push(`${goal} sudah diketahui = ${this.workingMemory[goal]}`);
        this.goalStack.pop();
        return { value: this.workingMemory[goal] };
      }

      const relevantRules = this.findRulesForGoal(goal);
      this.inferenceTrace.push(`Rule yang relevan untuk ${goal}: ${relevantRules.map(r => r.id).join(', ')}`);

      for (const rule of relevantRules) {
        this.inferenceTrace.push(`Mencoba rule ${rule.id}: ${rule.condition}`);

        if (this.canFireRule(rule)) {
          this.inferenceTrace.push(`Rule ${rule.id} memenuhi syarat`);

          const conclusion = rule.conclusion;
          const goalValue = conclusion[goal];

          this.workingMemory[goal] = goalValue;
          this.inferenceTrace.push(`Rule ${rule.id} firing: ${goal} = ${goalValue}`);
          
          this.goalStack.pop();
          return { value: goalValue, rule };
        } else {

          const missingPremises = this.getMissingPremises(rule);
          this.inferenceTrace.push(`Rule ${rule.id} membutuhkan: ${missingPremises.join(', ')}`);
          
          if (missingPremises.length > 0) {

            for (const premise of missingPremises) {
              if (!this.missingAttributes.includes(premise)) {
                this.missingAttributes.push(premise);
              }
            }
          }
        }
      }

      this.inferenceTrace.push(`Tidak ada rule yang bisa difire untuk ${goal}`);
      this.goalStack.pop();
      return null;
    }

    getInferenceTrace() {
      return this.inferenceTrace;
    }

    getNextQuestion() {
      if (this.missingAttributes.length > 0) {
        return this.missingAttributes[0];
      }
      return null;
    }
  
    // Mulai proses backward chaining dari goal tertentu 
    startBackward(goal) {
      this.inferenceTrace = [];
      this.missingAttributes = [];
      this.goalStack = [];
      
      const result = this.backward(goal);
      
      return {
        result,
        trace: this.inferenceTrace,
        missingAttributes: this.missingAttributes,
        workingMemory: { ...this.workingMemory }
      };
    }
  
    // Dapatkan semua fakta yang diketahui
    getWorkingMemory() {
      return { ...this.workingMemory };
    }
  }
  
  export default Backward;