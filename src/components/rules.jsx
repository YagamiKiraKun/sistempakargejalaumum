// rules.js - Renamed from rules.jsx for better compatibility
const rules = [
    {
      id: 1,
      condition: "etiologi = pernapasan AND respon = Langsung",
      premise: (facts) => facts.etiologi === "pernapasan" && facts.respon === "Langsung",
      conclusion: { penyakit: "ISPA" },
      cf: 0.80
    },
    {
      id: 2,
      condition: "etiologi = pernapasan AND respon = Bertahap AND medis = self-heal",
      premise: (facts) => facts.etiologi === "pernapasan" && facts.respon === "Bertahap" && facts.medis === "self-heal",
      conclusion: { penyakit: "ISPA" },
      cf: 0.85
    },
    {
      id: 3,
      condition: "etiologi = pernapasan AND respon = Bertahap AND medis = intensif",
      premise: (facts) => facts.etiologi === "pernapasan" && facts.respon === "Bertahap" && facts.medis === "intensif",
      conclusion: { penyakit: "TBC" },
      cf: 0.90
    },
    {
      id: 4,
      condition: "etiologi = sistemik AND medis = self-heal",
      premise: (facts) => facts.etiologi === "sistemik" && facts.medis === "self-heal",
      conclusion: { penyakit: "Penyakit lain" },
      cf: 0.75
    },
    {
      id: 5,
      condition: "etiologi = sistemik AND medis = intensif",
      premise: (facts) => facts.etiologi === "sistemik" && facts.medis === "intensif",
      conclusion: { penyakit: "DBD" },
      cf: 0.85
    },
    {
      id: 6,
      condition: "lebihSakit = otot",
      premise: (facts) => facts.lebihSakit === "otot",
      conclusion: { etiologi: "sistemik" },
      cf: 0.65
    },
    {
      id: 7,
      condition: "batuk = biasa AND lebihSakit = pernapasan",
      premise: (facts) => facts.batuk === "biasa" && facts.lebihSakit === "pernapasan",
      conclusion: { etiologi: "pernapasan" },
      cf: 0.75
    },
    {
      id: 8,
      condition: "batuk = parah AND sakit = otot AND tanda = keringat malam",
      premise: (facts) => facts.batuk === "parah" && facts.sakit === "otot" && facts.tanda === "keringat malam",
      conclusion: { etiologi: "pernapasan" },
      cf: 0.90
    },
    {
      id: 9,
      condition: "batuk = parah AND lebihSakit = pernapasan",
      premise: (facts) => facts.batuk === "parah" && facts.lebihSakit === "pernapasan",
      conclusion: { etiologi: "pernapasan" },
      cf: 0.85
    },
    {
      id: 10,
      condition: "timbulGejala = awal AND adaptasiTubuh = imun",
      premise: (facts) => facts.timbulGejala === "awal" && facts.adaptasiTubuh === "imun",
      conclusion: { respon: "Langsung" },
      cf: 0.80
    },
    {
      id: 11,
      condition: "timbulGejala = awal AND adaptasiTubuh = inflamasi",
      premise: (facts) => facts.timbulGejala === "awal" && facts.adaptasiTubuh === "inflamasi",
      conclusion: { respon: "Bertahap" },
      cf: 0.85
    },
    {
      id: 12,
      condition: "timbulGejala = lama",
      premise: (facts) => facts.timbulGejala === "lama",
      conclusion: { respon: "Bertahap" },
      cf: 0.70
    }
];

export { rules };
export default rules;