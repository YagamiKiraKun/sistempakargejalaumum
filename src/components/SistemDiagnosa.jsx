class SistemDiagnosa {
  constructor() {
      this.facts = {};
      this.workingMemory = [];
      this.steps = [];
      
      // Define rules with Certainty Factor
      this.rules = [
          { 
              id: 1, 
              premise: [
                  { attr: 'etiologi', value: 'pernapasan' },
                  { attr: 'respon', value: 'Langsung' }
              ],
              conclusion: { attr: 'penyakit_umum', value: 'ISPA' },
              cf: 0.80
          },
          { 
              id: 2, 
              premise: [
                  { attr: 'etiologi', value: 'pernapasan' },
                  { attr: 'respon', value: 'Bertahap' },
                  { attr: 'medis', value: 'self-heal' }
              ],
              conclusion: { attr: 'penyakit_umum', value: 'ISPA' },
              cf: 0.85
          },
          { 
              id: 3, 
              premise: [
                  { attr: 'etiologi', value: 'pernapasan' },
                  { attr: 'respon', value: 'Bertahap' },
                  { attr: 'medis', value: 'intensif' }
              ],
              conclusion: { attr: 'penyakit_umum', value: 'TBC' },
              cf: 0.90
          },
          { 
              id: 4, 
              premise: [
                  { attr: 'etiologi', value: 'sistemik' },
                  { attr: 'medis', value: 'self-heal' }
              ],
              conclusion: { attr: 'penyakit_umum', value: 'Penyakit lain' },
              cf: 0.75
          },
          { 
              id: 5, 
              premise: [
                  { attr: 'etiologi', value: 'sistemik' },
                  { attr: 'medis', value: 'intensif' }
              ],
              conclusion: { attr: 'penyakit_umum', value: 'DBD' },
              cf: 0.85
          }
      ];
  }
  
  // Add facts to the knowledge base
  addFacts(facts) {
      this.facts = { ...this.facts, ...facts };
      
      // Convert facts to working memory with default CF
      Object.keys(facts).forEach(key => {
          this.workingMemory.push({
              attr: key,
              value: facts[key],
              cf: 0.8 // Default CF for user inputs
          });
          
          this.steps.push(`Fakta awal: ${key} = ${facts[key]} (CF = 0.8)`);
      });
  }
  
  // Get final diagnosis using backward chaining
  getPenyakit() {
      this.steps.push("Memulai backward chaining untuk diagnosa penyakit");
      this.steps.push("Goal: penyakit_umum");
      
      // Checking each rule to see if it matches our facts
      for (const rule of this.rules) {
          this.steps
              .push(`Memeriksa Rule ${rule.id}: IF ${rule.premise.map(p => `${p.attr} = ${p.value}`).join(' AND ')} THEN ${rule.conclusion.attr} = ${rule.conclusion.value} (CF = ${rule.cf})`);
          
          // Check if all premises match
          let allMatch = true;
          const cfValues = [];
          
          for (const premise of rule.premise) {
              const fact = this.facts[premise.attr];
              
              if (fact === premise.value) {
                  // Find CF value from working memory
                  const wmFact = this.workingMemory.find(f => 
                      f.attr === premise.attr && f.value === premise.value);
                  
                  const cfValue = wmFact ? wmFact.cf : 0.8; // Default if not found
                  cfValues.push(cfValue);
                  
                  this.steps.push(`  ✓ Premis ${premise.attr} = ${premise.value} cocok (CF = ${cfValue.toFixed(2)})`);
              } else {
                  allMatch = false;
                  this.steps.push(`  ✗ Premis ${premise.attr} = ${premise.value} tidak cocok dengan fakta ${premise.attr} = ${fact || 'tidak ada'}`);
                  break;
              }
          }
          
          // If all premises match, add conclusion to working memory
          if (allMatch) {
              // Calculate CF using min-max method
              const minCF = Math.min(...cfValues);
              const ruleCF = minCF * rule.cf;
              
              this.steps.push(`  Rule ${rule.id} fired! Menghitung CF: MIN(${cfValues.map(v => v.toFixed(2)).join(', ')}) * ${rule.cf} = ${ruleCF.toFixed(2)}`);
              
              // Add conclusion to working memory
              this.workingMemory.push({
                  attr: rule.conclusion.attr,
                  value: rule.conclusion.value,
                  cf: ruleCF
              });
              
              this.steps.push(`  Menambahkan ${rule.conclusion.attr} = ${rule.conclusion.value} (CF = ${ruleCF.toFixed(2)}) ke working memory`);
              
              // Return result if it's a penyakit_umum conclusion
              if (rule.conclusion.attr === 'penyakit_umum') {
                  this.steps.push(`Diagnosa final: ${rule.conclusion.value} dengan CF = ${ruleCF.toFixed(2)}`);
                  
                  return {
                      result: {
                          value: rule.conclusion.value,
                          cf: ruleCF
                      },
                      workingMemory: this.workingMemory,
                      steps: this.steps
                  };
              }
          }
      }
      
      this.steps.push("Tidak ada rule yang cocok dengan fakta-fakta yang ada.");
      
      // If no matching rule found
      return {
          result: null,
          workingMemory: this.workingMemory,
          steps: this.steps
      };
  }
}

export default SistemDiagnosa;