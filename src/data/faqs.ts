/**
 * FAQ schema data for each article.
 * Injected as FAQPage JSON-LD structured data for AEO (Answer Engine Optimization).
 * Keys are Ghost post slugs.
 */

export interface FaqItem {
  question: string;
  answer: string;
}

export const articleFaqs: Record<string, FaqItem[]> = {
  "scars-of-gold-the-art-of-kintsugi": [
    {
      question: "What is kintsugi?",
      answer:
        'Kintsugi, literally "golden joinery," is the Japanese practice of repairing broken ceramics with lacquer and powdered gold. Rather than hiding the damage, the technique highlights it. The cracks become luminous gold seams that map the history of the object.',
    },
    {
      question: "Where did kintsugi originate?",
      answer:
        "Kintsugi emerged in late 15th-century Japan during the Muromachi period, developed alongside the Japanese tea ceremony. Legend traces it to shogun Ashikaga Yoshimasa, who had a broken tea bowl repaired with gold after rejecting a metal-staple repair sent back from China.",
    },
    {
      question: "Is kintsugi food safe?",
      answer:
        "Traditional kintsugi using real urushi lacquer and pure gold powder is food-safe once fully cured. Urushi has been used on Japanese tableware for centuries. Most modern epoxy-based DIY kits are NOT food-safe and should not be used on cups or bowls that contact food or drink.",
    },
    {
      question: "What are the three styles of kintsugi?",
      answer:
        "The three styles are crack (hibi), where gold follows the natural fracture lines; piece method (kake no kintsugi), where a missing fragment is replaced with a gold-lacquer fill; and joint call (yobitsugi), where a fragment from a different vessel fills the gap intentionally.",
    },
    {
      question: "How long does traditional kintsugi take?",
      answer:
        "A simple kintsugi repair takes about a month. Complex restorations with multiple breaks or missing pieces can take two to three months. The process uses urushi lacquer that cures in humid conditions rather than air-drying like conventional adhesives.",
    },
  ],
  "warren-mackenzie-the-ceramics-legend-who-changed-american-pottery": [
    {
      question: "Who was Warren MacKenzie?",
      answer:
        "Warren MacKenzie (1924-2018) was an American studio potter from Stillwater, Minnesota who spent 37 years teaching at the University of Minnesota. He is considered the father of the modern American studio pottery movement and brought the Japanese Mingei philosophy to America.",
    },
    {
      question: "What is the Mingei philosophy in ceramics?",
      answer:
        "Mingei is a Japanese folk art tradition holding that beauty lives in everyday functional objects made without ego. Warren MacKenzie absorbed it while studying under Bernard Leach in Cornwall. It holds that a good pot belongs in your hands, not on a pedestal.",
    },
    {
      question: "What is Mingeisota?",
      answer:
        "Mingeisota is the ceramics community that grew around Warren MacKenzie's philosophy in Minnesota. It was not a brand but a way of living: find affordable rural land, build a kiln, make functional pots, keep prices fair, and let the work speak for itself.",
    },
    {
      question: "How much did Warren MacKenzie sell his pottery for?",
      answer:
        "MacKenzie sold his pots at very low prices, some for as little as six dollars, because he believed ordinary people should be able to eat and drink from handmade pots. He eventually closed his self-service showroom after people bought his work to resell online at large markups.",
    },
  ],
  "best-clay-types-for-beginners-and-what-actually-matters-first": [
    {
      question: "What is the best clay for beginners?",
      answer:
        "For beginners without a kiln, polymer clay or air-dry clay requires no equipment and builds confidence. For fired ceramics, mid-fire stoneware at cone 5 to 6 is the best starting point. It is durable, versatile, works with commercial glazes, and is standard in most community studios.",
    },
    {
      question: "What is the difference between earthenware, stoneware, and porcelain?",
      answer:
        "Earthenware fires at low temperatures (cone 06 to 04) and is beginner-friendly but less durable. Stoneware fires at mid-range (cone 5 to 6) and is the best beginner choice for functional pottery. Porcelain and high-fire clays (cone 9 to 10) require advanced kilns and are not recommended for beginners.",
    },
    {
      question: "Do beginners need a kiln to start working with clay?",
      answer:
        "No. Polymer clay, air-dry clay, and homemade salt dough require no kiln at all. These are valid starting points that build familiarity and curiosity. A kiln only becomes necessary when you want to make fired, food-safe, durable ceramics.",
    },
    {
      question: "What happens if you use the wrong clay in a kiln?",
      answer:
        "Clay temperature is an absolute, not a suggestion. Every clay body is designed to mature at a specific cone temperature. Using the wrong clay risks cracking, warping, or in the worst case, melting and damaging an entire kiln load, including other people's work in a shared studio.",
    },
  ],
  "what-is-a-yunomi": [
    {
      question: "What is a yunomi?",
      answer:
        "A yunomi is a traditional Japanese tea cup, typically cylindrical or slightly tapered, with a foot ring and no handle. Unlike a chawan used in formal tea ceremony, the yunomi is designed for everyday drinking. It is almost always made of stoneware or porcelain fired at high temperatures.",
    },
    {
      question: "What is the difference between a yunomi and a chawan?",
      answer:
        "A chawan is a wide, open bowl used in formal Japanese tea ceremony. It is ceremonial and often displayed. A yunomi is a smaller, cylindrical cup meant for daily use: the cup you reach for in the morning and wrap both hands around on a cold afternoon.",
    },
    {
      question: "What should I look for when buying a handmade yunomi?",
      answer:
        "Check four things: the foot ring (should feel deliberate, not like an afterthought), the rim (slight natural variation means it was made by hand), the glaze break (look for depth and movement, not flat coverage), and the weight (substantial but balanced when held empty and imagined full of tea).",
    },
    {
      question: "How much does a handmade yunomi cost?",
      answer:
        "A well-made yunomi by a skilled studio potter typically runs $80 to $300, sometimes more for established artists. Prices reflect the time, materials, and skill involved. Yunomi remain accessible compared to larger statement pieces and improve with daily use, developing their own patina over time.",
    },
  ],
  "soda-firing-explained": [
    {
      question: "What is soda firing?",
      answer:
        "Soda firing is a kiln technique where sodium carbonate (soda ash) is introduced into the kiln at peak temperature, around 2,300 degrees F (cone 10). The sodium vaporizes and bonds with silica in the clay surface, creating a glassy coating without any hand-applied glaze. No two pieces come out the same.",
    },
    {
      question: "What is the difference between soda firing and salt firing?",
      answer:
        "Salt firing uses sodium chloride (table salt), which produces a distinctive orange-peel texture but releases hydrochloric acid, hard on kilns and the environment. Soda firing uses sodium carbonate or baking soda, producing smoother, more varied surfaces without toxic gases. Most contemporary ceramic artists have shifted to soda.",
    },
    {
      question: "Why are soda-fired ceramics more expensive?",
      answer:
        "A full soda firing cycle runs roughly 36 hours. Experienced firers keep only 60 to 80 percent of a kiln load. Kiln placement is an art that determines each piece's character. And there are no do-overs: a soda-fired piece is exactly what the kiln made it.",
    },
    {
      question: "How does soda firing create variation on a single piece?",
      answer:
        "Soda vapor travels on the flame path and does not land evenly. Pieces near the ports get hit harder. Pieces sheltered behind others get less. The side of a bowl facing the flame looks completely different from the side facing away, all from the same firing.",
    },
  ],
  "shino-the-glaze-that-never-fires-the-same-way-twice": [
    {
      question: "What is shino glaze?",
      answer:
        "Shino glaze is a feldspar-based ceramic glaze originally developed in Japan during the Momoyama period (late 1500s). It is known for producing an extraordinary range of surface effects: crawling textures, snow-like surfaces, crackle patterns, and dramatic color shifts from white to orange depending on firing conditions.",
    },
    {
      question: "What makes shino glaze unique?",
      answer:
        "Shino reacts strongly to reduction atmospheres, trapping carbon crystals and developing crawling, blistering, and unique textures. The same recipe produces radically different results depending on kiln atmosphere, firing schedule, placement, glaze thickness, and clay body. No two firings ever look the same.",
    },
    {
      question: "What type of kiln is used for shino glaze?",
      answer:
        "Shino does best in gas or wood kilns fired to cone 10 in reduction atmosphere. Reduction deepens orange hues, can trap carbon creating greenish areas, and encourages the surface movement that makes shino distinctive. Oxidizing or overly rapid firings flatten the glaze's potential.",
    },
    {
      question: "What is shino glaze made of?",
      answer:
        "Traditional shino glaze is primarily feldspar-based, with feldspar serving as the main flux. This gives it a high melting point and heavy silica component. Firing conditions rather than ingredients drive the wide variation in results.",
    },
  ],
};
