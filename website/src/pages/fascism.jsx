import React, { useState } from 'react';
import Layout from '@theme/Layout';
import styles from './fascism.module.css';

export default function Fascism() {
  const [expandedSection, setExpandedSection] = useState(null);

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <Layout
      title="Fascism Warning"
      description="Scholarly analysis of fascist characteristics in Trump's actions - expert warnings about threats to American democracy">
      <div className={styles.container}>
        {/* Alert Banner */}
        <div className={styles.alertBanner}>
          <span className={styles.alertIcon}>⚠️</span>
          <div className={styles.alertContent}>
            <h2>A Warning from History</h2>
            <p>Leading historians, political scientists, and Holocaust scholars are raising alarms about fascist characteristics in Trump's rhetoric and actions. This is not hyperbole—it's based on decades of scholarship on authoritarian movements.</p>
          </div>
        </div>

        {/* Introduction */}
        <section className={styles.intro}>
          <h1>🚨 The Fascism Comparison</h1>
          <p className={styles.subtitle}>
            Why Experts Are Sounding the Alarm About American Democracy
          </p>

          <div className={styles.expertQuote}>
            <blockquote>
              "Trump's incitement of the invasion of the Capitol on January 6, 2020 removes my objection to the fascist label. His open encouragement of civic violence to overturn an election crosses a red line. <strong>The label now seems not just acceptable but necessary.</strong>"
            </blockquote>
            <cite>— Robert Paxton, Columbia University, Leading Fascism Expert</cite>
          </div>

          <p className={styles.context}>
            After January 6, 2021, several prominent scholars who had previously resisted calling Trump a fascist changed their position. They now warn that Trump's actions match historical patterns of fascist movements. Below is the scholarly evidence they cite.
          </p>
        </section>

        {/* Key Statistics */}
        <div className={styles.statsGrid}>
          <div className={styles.statBox}>
            <div className={styles.statNumber}>500+</div>
            <div className={styles.statLabel}>Political scientists say U.S. is moving toward authoritarianism</div>
          </div>
          <div className={styles.statBox}>
            <div className={styles.statNumber}>34/35</div>
            <div className={styles.statLabel}>Legal scholars agree: Trump is a lawless authoritarian</div>
          </div>
          <div className={styles.statBox}>
            <div className={styles.statNumber}>400+</div>
            <div className={styles.statLabel}>International scholars signed anti-fascism warning letter</div>
          </div>
        </div>

        {/* Umberto Eco's 14 Characteristics */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            <span className={styles.icon}>📋</span>
            Umberto Eco's 14 Characteristics of Fascism
          </h2>
          <p className={styles.sectionIntro}>
            In 1995, Italian philosopher Umberto Eco identified 14 features that characterize fascist movements. Scholars note Trump exhibits the majority of these characteristics:
          </p>

          <div className={styles.characteristicsList}>
            <div className={styles.characteristic}>
              <div className={styles.characteristicHeader}>
                <h3>1. Cult of Tradition</h3>
                <span className={styles.matchBadge}>✓ Match</span>
              </div>
              <p className={styles.definition}><strong>Definition:</strong> Belief that all truth has already been revealed by tradition</p>
              <div className={styles.trumpExample}>
                <strong>Trump Example:</strong> "Make America Great Again" - appeals to undefined past American greatness; restoration of traditional family values centered on white Christian male power
              </div>
            </div>

            <div className={styles.characteristic}>
              <div className={styles.characteristicHeader}>
                <h3>2. Rejection of Modernism</h3>
                <span className={styles.partialBadge}>~ Partial</span>
              </div>
              <p className={styles.definition}><strong>Definition:</strong> Views Enlightenment rationalism as descent into depravity; anti-intellectualism</p>
              <div className={styles.trumpExample}>
                <strong>Trump Example:</strong> Attacks on expertise and expert knowledge; declared "patriotic education" commission; called examination of history through race lens "ideological poison"
              </div>
            </div>

            <div className={styles.characteristic}>
              <div className={styles.characteristicHeader}>
                <h3>3. Cult of Action for Action's Sake</h3>
                <span className={styles.partialBadge}>~ Partial</span>
              </div>
              <p className={styles.definition}><strong>Definition:</strong> Action valued without intellectual reflection; "thinking is emasculation"</p>
              <div className={styles.trumpExample}>
                <strong>Trump Example:</strong> Emphasis on decisive executive action; disdain for policy deliberation and expert consultation
              </div>
            </div>

            <div className={styles.characteristic}>
              <div className={styles.characteristicHeader}>
                <h3>4. Disagreement is Treason</h3>
                <span className={styles.matchBadge}>✓ Match</span>
              </div>
              <p className={styles.definition}><strong>Definition:</strong> Devalues intellectual discourse; critical reasoning rejected as barrier to action</p>
              <div className={styles.trumpExample}>
                <strong>Trump Example:</strong> Labeled opponents treasonous (Obama, media, Adam Schiff, Democrats); called BLM statements "Treason, Sedition, and Insurrection!"; DOJ declared three cities "anarchist jurisdictions"
              </div>
            </div>

            <div className={styles.characteristic}>
              <div className={styles.characteristicHeader}>
                <h3>5. Fear of Difference</h3>
                <span className={styles.matchBadge}>✓ Match</span>
              </div>
              <p className={styles.definition}><strong>Definition:</strong> Exploits xenophobia and racism to unify against outsiders; inherently racist</p>
              <div className={styles.trumpExample}>
                <strong>Trump Example:</strong> Called Mexican migrants "drug dealers, criminals, and rapists"; Muslim ban; questioned why Africans and Haitians immigrated; told politicians of color to "go back"
              </div>
            </div>

            <div className={styles.characteristic}>
              <div className={styles.characteristicHeader}>
                <h3>6. Appeal to Frustrated Middle Class</h3>
                <span className={styles.matchBadge}>✓ Match</span>
              </div>
              <p className={styles.definition}><strong>Definition:</strong> Mobilizes those feeling economically or socially displaced</p>
              <div className={styles.trumpExample}>
                <strong>Trump Example:</strong> Appeals to working-class white Americans (coal miners, outsourced workers); narrative of "forgotten men and women"; blames immigrants for job losses
              </div>
            </div>

            <div className={styles.characteristic}>
              <div className={styles.characteristicHeader}>
                <h3>7. Obsession with a Plot</h3>
                <span className={styles.matchBadge}>✓ Match</span>
              </div>
              <p className={styles.definition}><strong>Definition:</strong> Promotes conspiracy theories to justify aggression against enemies</p>
              <div className={styles.trumpExample}>
                <strong>Trump Example:</strong> "Deep state" conspiracy; "Stop the Steal" and election fraud claims; QAnon conspiracy amplification; claims of international plots against America
              </div>
            </div>

            <div className={styles.characteristic}>
              <div className={styles.characteristicHeader}>
                <h3>8. Enemies Both Strong and Weak</h3>
                <span className={styles.matchBadge}>✓ Match</span>
              </div>
              <p className={styles.definition}><strong>Definition:</strong> Portrays adversaries as simultaneously formidable and feeble</p>
              <div className={styles.trumpExample}>
                <strong>Trump Example:</strong> Immigrants portrayed as both dangerous criminals and weak parasites; Democrats both existential threat and incompetent; China simultaneously unstoppable and easily defeated
              </div>
            </div>

            <div className={styles.characteristic}>
              <div className={styles.characteristicHeader}>
                <h3>9. Pacifism is Trafficking with the Enemy</h3>
                <span className={styles.partialBadge}>~ Partial</span>
              </div>
              <p className={styles.definition}><strong>Definition:</strong> Life lived for struggle; peace-seeking equals collaboration with enemies</p>
              <div className={styles.trumpExample}>
                <strong>Trump Example:</strong> Attacks on diplomacy-minded generals as "weak"; framing of politics as war; "strength" rhetoric
              </div>
            </div>

            <div className={styles.characteristic}>
              <div className={styles.characteristicHeader}>
                <h3>10. Contempt for the Weak / Elitism</h3>
                <span className={styles.matchBadge}>✓ Match</span>
              </div>
              <p className={styles.definition}><strong>Definition:</strong> Everyone educated to become hero; dismisses vulnerable populations</p>
              <div className={styles.trumpExample}>
                <strong>Trump Example:</strong> Mockery of disabled reporter; dismissal of prisoners of war ("I like people who weren't captured"); attacks on vulnerable immigrants
              </div>
            </div>

            <div className={styles.characteristic}>
              <div className={styles.characteristicHeader}>
                <h3>11. Cult of Heroism and Death</h3>
                <span className={styles.partialBadge}>~ Partial</span>
              </div>
              <p className={styles.definition}><strong>Definition:</strong> Culture glorifies heroic sacrifice; "sends other people to death"</p>
              <div className={styles.trumpExample}>
                <strong>Trump Example:</strong> Called himself "wartime president"; glorification of military while avoiding personal service; defense of Kyle Rittenhouse
              </div>
            </div>

            <div className={styles.characteristic}>
              <div className={styles.characteristicHeader}>
                <h3>12. Machismo and Weaponry</h3>
                <span className={styles.matchBadge}>✓ Match</span>
              </div>
              <p className={styles.definition}><strong>Definition:</strong> Permanent war sublimated into sexual sphere; misogyny and intolerance toward non-traditional sexuality</p>
              <div className={styles.trumpExample}>
                <strong>Trump Example:</strong> 26+ sexual assault accusations; attacked women's appearance, called women "nasty"; systematic attacks on transgender rights; "Access Hollywood" tape; praised authoritarian "strongmen"
              </div>
            </div>

            <div className={styles.characteristic}>
              <div className={styles.characteristicHeader}>
                <h3>13. Selective Populism</h3>
                <span className={styles.matchBadge}>✓ Match</span>
              </div>
              <p className={styles.definition}><strong>Definition:</strong> Leader presents as interpreter of popular will to delegitimize democratic institutions</p>
              <div className={styles.trumpExample}>
                <strong>Trump Example:</strong> "I alone can fix it"; claims to speak for "real Americans"; delegitimization of courts, press, Congress; rally crowds presented as "the People"
              </div>
            </div>

            <div className={styles.characteristic}>
              <div className={styles.characteristicHeader}>
                <h3>14. Newspeak</h3>
                <span className={styles.matchBadge}>✓ Match</span>
              </div>
              <p className={styles.definition}><strong>Definition:</strong> Impoverished vocabulary and elementary syntax to limit critical reasoning</p>
              <div className={styles.trumpExample}>
                <strong>Trump Example:</strong> Repetitive simple phrases ("Build the wall," "Drain the swamp," "Fake news"); limited vocabulary; avoidance of nuance
              </div>
            </div>
          </div>

          <div className={styles.tally}>
            <strong>Trump exhibits 11 of 14 characteristics (3 partial matches)</strong>
          </div>
        </section>

        {/* Hitler's Rhetoric */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            <span className={styles.icon}>📢</span>
            Echoes of Hitler's Rhetoric
          </h2>
          <p className={styles.sectionIntro}>
            Historians have identified specific phrases Trump uses that directly parallel Hitler's language from Mein Kampf and Nazi speeches:
          </p>

          <div className={styles.rhetoricalComparisons}>
            <div className={styles.comparison}>
              <h3>"Poisoning the Blood"</h3>
              <div className={styles.comparisonGrid}>
                <div className={styles.comparisonSide}>
                  <strong>Trump (2023-2025):</strong>
                  <p>"Immigration is <strong>poisoning the blood</strong> of the United States"</p>
                </div>
                <div className={styles.comparisonSide}>
                  <strong>Hitler (Mein Kampf, 1925):</strong>
                  <p>"All great cultures of the past perished only because the originally creative race died out from <strong>blood poisoning</strong>"</p>
                </div>
              </div>
              <div className={styles.expertNote}>
                <strong>Expert Analysis:</strong> Jason Stanley (Yale): "This is textbook Mein Kampf"
              </div>
            </div>

            <div className={styles.comparison}>
              <h3>"Vermin"</h3>
              <div className={styles.comparisonGrid}>
                <div className={styles.comparisonSide}>
                  <strong>Trump:</strong>
                  <p>"We will root out the communists, Marxists, fascists, and the radical left thugs that live like <strong>vermin</strong> within the confines of our country"</p>
                </div>
                <div className={styles.comparisonSide}>
                  <strong>Hitler & Mussolini:</strong>
                  <p>Used "vermin" to dehumanize Jews and political opponents before escalating to violence</p>
                </div>
              </div>
              <div className={styles.expertNote}>
                <strong>Expert Analysis:</strong> Ruth Ben-Ghiat (NYU): "Calling people 'vermin' was used effectively by Hitler and Mussolini to dehumanize people and encourage their followers to engage in violence"
              </div>
            </div>

            <div className={styles.comparison}>
              <h3>"Enemy of the People"</h3>
              <div className={styles.comparisonGrid}>
                <div className={styles.comparisonSide}>
                  <strong>Trump (2017-present):</strong>
                  <p>Repeatedly called press "<strong>enemy of the American people</strong>"</p>
                </div>
                <div className={styles.comparisonSide}>
                  <strong>Hitler, Stalin, Mao:</strong>
                  <p>All used "enemy of the people" to target and eliminate opponents. Khrushchev said it was specifically introduced for physically annihilating those who disagreed</p>
                </div>
              </div>
              <div className={styles.expertNote}>
                <strong>Expert Analysis:</strong> This phrase has been used by authoritarian leaders throughout history to justify violence against perceived enemies
              </div>
            </div>
          </div>

          <div className={styles.warningBox}>
            <strong>⚠️ When confronted:</strong> Trump said "I never knew that Hitler said it" but then <strong>repeated the phrase</strong> anyway. Historians note this shows either ignorance of history or deliberate continuation despite the parallel.
          </div>
        </section>

        {/* First 100 Days Comparison */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            <span className={styles.icon}>📅</span>
            First 100 Days: Hitler (1933) vs. Trump (2025)
          </h2>
          <p className={styles.sectionIntro}>
            Werner Lange, who "was born in the rubble that was Germany after the fascists got through with the Vaterland," documented striking parallels between Hitler's first 100 days (Jan 30 - May 9, 1933) and Trump's second-term first 100 days (Jan 20 - April 27, 2025):
          </p>

          <div className={styles.timeline}>
            <div className={styles.timelineRow}>
              <div className={styles.timelineCell}>
                <strong>Hitler (1933)</strong>
              </div>
              <div className={styles.timelineCell}>
                <strong>Fascist Tactic</strong>
              </div>
              <div className={styles.timelineCell}>
                <strong>Trump (2025)</strong>
              </div>
            </div>

            <div className={styles.timelineRow}>
              <div className={styles.timelineCell}>
                <strong>Reichstag Fire Decree</strong> (Feb 27) - Nullified civil liberties through emergency decree
              </div>
              <div className={styles.timelineCell}>
                <span className={styles.tacticBadge}>Emergency Powers</span>
              </div>
              <div className={styles.timelineCell}>
                Invoked <strong>1918 Alien Enemies Act</strong> for mass deportations; declared national emergency at border
              </div>
            </div>

            <div className={styles.timelineRow}>
              <div className={styles.timelineCell}>
                <strong>Civil Service Purges</strong> - Jews and "disloyal" removed from government
              </div>
              <div className={styles.timelineCell}>
                <span className={styles.tacticBadge}>Political Purges</span>
              </div>
              <div className={styles.timelineCell}>
                Fired dozens of <strong>Inspector Generals</strong>, prosecutors, agency heads, immigration judges, and "disloyal" federal workers
              </div>
            </div>

            <div className={styles.timelineRow}>
              <div className={styles.timelineCell}>
                <strong>Enabling Act</strong> (March 23) - Centralized dictatorial power
              </div>
              <div className={styles.timelineCell}>
                <span className={styles.tacticBadge}>Gleichschaltung</span>
              </div>
              <div className={styles.timelineCell}>
                <strong>DOGE</strong> created to "synchronize" all government operations under executive control
              </div>
            </div>

            <div className={styles.timelineRow}>
              <div className={styles.timelineCell}>
                <strong>Dachau Concentration Camp</strong> opened (March 23) for political opponents
              </div>
              <div className={styles.timelineCell}>
                <span className={styles.tacticBadge}>Detention Without Trial</span>
              </div>
              <div className={styles.timelineCell}>
                Sent 50+ Venezuelans to <strong>Guantanamo</strong>; 250+ to El Salvador's <strong>CECOT</strong> super-max prison
              </div>
            </div>

            <div className={styles.timelineRow}>
              <div className={styles.timelineCell}>
                <strong>Persecution of Homosexuals</strong> escalated
              </div>
              <div className={styles.timelineCell}>
                <span className={styles.tacticBadge}>LGBTQ+ Targeting</span>
              </div>
              <div className={styles.timelineCell}>
                Systematic attacks on <strong>transgender rights</strong>; rolled back LGBTQ student protections; "most concerted anti-trans push since Nazis"
              </div>
            </div>

            <div className={styles.timelineRow}>
              <div className={styles.timelineCell}>
                <strong>Book Burning</strong> (May 10) - Removal of "un-German" books
              </div>
              <div className={styles.timelineCell}>
                <span className={styles.tacticBadge}>Historical Revisionism</span>
              </div>
              <div className={styles.timelineCell}>
                Signed <strong>"Restoring Truth and Sanity to American History"</strong> order; removed "improper ideology" from Smithsonian museums
              </div>
            </div>

            <div className={styles.timelineRow}>
              <div className={styles.timelineCell}>
                <strong>Aryan Racial Policy</strong> enforcement
              </div>
              <div className={styles.timelineCell}>
                <span className={styles.tacticBadge}>Nationalist Supremacy</span>
              </div>
              <div className={styles.timelineCell}>
                <strong>English-only mandate</strong>; targeting immigrants/minorities; Stephen Miller: "America is for Americans and Americans only"
              </div>
            </div>

            <div className={styles.timelineRow}>
              <div className={styles.timelineCell}>
                <strong>Day 100 Result:</strong> Democracy "dead and buried"
              </div>
              <div className={styles.timelineCell}>
                <span className={styles.criticalBadge}>Status</span>
              </div>
              <div className={styles.timelineCell}>
                <strong>Day 100 Result:</strong> Democracy "deeply wounded" but resistance movements growing
              </div>
            </div>
          </div>

          <div className={styles.expertQuote}>
            <blockquote>
              "The parallel between the first 100 days of Hitler and Trump is <strong>striking and chilling</strong>. By May 9, 1933, Hitler's first 100 days, the German republic was dead and buried. The German Führer was far more successful than Donald Trump in ending democracy in his first 100 days."
            </blockquote>
            <cite>— Werner Lange, CommonDreams</cite>
          </div>

          <div className={styles.criticalDifference}>
            <h3>Critical Difference:</h3>
            <p>The key difference is that <strong>American democratic institutions proved more resilient</strong>. Massive resistance movements emerged quickly, resulting in electoral victories (Wisconsin Supreme Court) and millions of protesters ("Hands Off" - 4 million at 1,500 sites). As of day 100, American democracy remained "deeply wounded" but alive, unlike Germany where democracy was "dead and buried."</p>
          </div>
        </section>

        {/* Anti-Intellectualism and Attacks on Expertise */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            <span className={styles.icon}>🔬</span>
            Anti-Intellectualism: "Trust Me, Not the Experts"
          </h2>
          <p className={styles.sectionIntro}>
            A core fascist tactic is undermining experts and institutions to establish the leader as the sole source of truth. Trump has systematically attacked and replaced scientists, doctors, economists, and other experts with loyalists, telling the public to trust him instead.
          </p>

          <div className={styles.expertiseAttacks}>
            <div className={styles.attackCategory}>
              <h3>🏥 Public Health Experts</h3>
              <div className={styles.attackList}>
                <div className={styles.attackItem}>
                  <strong>Mass Firings:</strong>
                  <ul>
                    <li>Hundreds of CDC "disease detectives" fired (later reinstated after outcry)</li>
                    <li>2,400 CDC positions eliminated total</li>
                    <li>3,500 FDA positions cut including entire communications team</li>
                    <li>Eliminated CDC's Lead Poisoning Prevention Branch</li>
                    <li>Cut FDA's Division of Food Processing Science and Technology</li>
                  </ul>
                </div>
                <div className={styles.attackItem}>
                  <strong>COVID-19:</strong>
                  <ul>
                    <li>Dismissed epidemiologists' warnings about pandemic</li>
                    <li>Contradicted CDC guidance repeatedly</li>
                    <li>"I know more about [COVID] than the doctors"</li>
                    <li>Promoted unproven treatments over expert medical advice</li>
                    <li>Attacked Dr. Fauci for providing scientific guidance</li>
                  </ul>
                </div>
                <div className={styles.attackItem}>
                  <strong>Replacement with Loyalists:</strong>
                  <ul>
                    <li>Appointed RFK Jr. (anti-vaccine activist) as HHS Secretary</li>
                    <li>Gutted childhood vaccine schedule without scientific review</li>
                    <li>Called fluoride "dangerous neurotoxin" despite decades of scientific consensus</li>
                    <li>Opposed folic acid fortification (prevents birth defects)</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className={styles.attackCategory}>
              <h3>🔬 Scientific Research</h3>
              <div className={styles.attackList}>
                <div className={styles.attackItem}>
                  <strong>NIH and Research Funding:</strong>
                  <ul>
                    <li>Cut $2.7 billion from NIH funding</li>
                    <li>Cancer research decreased 31%</li>
                    <li>Terminated 5,844 already-funded NIH grants (unprecedented)</li>
                    <li>Proposed 40% NIH budget cut ($18 billion)</li>
                    <li>1,200 NIH positions eliminated</li>
                  </ul>
                </div>
                <div className={styles.attackItem}>
                  <strong>Climate Scientists:</strong>
                  <ul>
                    <li>Called climate change a "hoax"</li>
                    <li>Reduced NOAA staffing sharply</li>
                    <li>Withdrew from Paris Climate Agreement</li>
                    <li>Suppressed climate research and reports</li>
                    <li>Attacked environmental scientists as "alarmists"</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className={styles.attackCategory}>
              <h3>💰 Economic Experts</h3>
              <div className={styles.attackList}>
                <div className={styles.attackItem}>
                  <strong>Federal Reserve:</strong>
                  <ul>
                    <li>Called Fed Chair Jerome Powell "enemy of the people" comparable to Xi Jinping</li>
                    <li>DOJ launched criminal investigation of Powell</li>
                    <li>Threatened to fire Powell (legally cannot)</li>
                    <li>13 top economists including former Fed chairs condemned attacks</li>
                    <li>Economists warn: threatens economic stability, could cause higher inflation and mortgage rates</li>
                  </ul>
                </div>
                <div className={styles.attackItem}>
                  <strong>Trade Policy:</strong>
                  <ul>
                    <li>Ignored economists' warnings about tariff impacts</li>
                    <li>245% China tariffs despite expert consensus on harm</li>
                    <li>"What do they know? I know better"</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className={styles.attackCategory}>
              <h3>⚖️ Legal and Oversight Experts</h3>
              <div className={styles.attackList}>
                <div className={styles.attackItem}>
                  <strong>Inspector General Purges:</strong>
                  <ul>
                    <li>Fired dozens of Inspector Generals</li>
                    <li>At least 5 IGs fired in first term for investigating administration</li>
                    <li>IGs are independent oversight officials meant to check corruption</li>
                    <li>Unprecedented systematic removal of watchdogs</li>
                  </ul>
                </div>
                <div className={styles.attackItem}>
                  <strong>Career Prosecutors and Judges:</strong>
                  <ul>
                    <li>Fired all Biden-era U.S. Attorneys</li>
                    <li>Fired prosecutors involved in Trump cases</li>
                    <li>Fired 18 immigration judges</li>
                    <li>Wisconsin judge arrested for obstructing deportation case</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className={styles.attackCategory}>
              <h3>🎓 Universities and Education</h3>
              <div className={styles.attackList}>
                <div className={styles.attackItem}>
                  <strong>Historical Revisionism:</strong>
                  <ul>
                    <li>Signed "Restoring Truth and Sanity to American History" executive order</li>
                    <li>Called examination of history through race lens "ideological poison"</li>
                    <li>Declared "patriotic education" commission</li>
                    <li>Removed materials from Smithsonian museums deemed "improper ideology"</li>
                  </ul>
                </div>
                <div className={styles.attackItem}>
                  <strong>Higher Education Attacks:</strong>
                  <ul>
                    <li>Threatened to defund universities that allow protest</li>
                    <li>Prohibited federal funding to schools with COVID vaccine requirements</li>
                    <li>Attacked universities as "indoctrination centers"</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.cultOfPersonality}>
            <h3>"I Alone Can Fix It"</h3>
            <p>The pattern is clear: <strong>Discredit the experts, claim only Trump knows the truth, demand personal loyalty.</strong> This is textbook authoritarianism.</p>
            <div className={styles.trumpQuotes}>
              <blockquote>"I know more about ISIS than the generals do, believe me."</blockquote>
              <blockquote>"Nobody knows the system better than me."</blockquote>
              <blockquote>"Nobody knows more about taxes than I do."</blockquote>
              <blockquote>"I know more about courts than any human being on Earth."</blockquote>
              <blockquote>"I understand the tax laws better than almost anyone."</blockquote>
              <blockquote>"I know tech better than anyone."</blockquote>
              <blockquote>"Nobody knows banking better than I do."</blockquote>
            </div>
          </div>
        </section>

        {/* The Full Fascist Playbook */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            <span className={styles.icon}>📖</span>
            The Fascist Playbook: Beyond Eco's 14 Characteristics
          </h2>
          <p className={styles.sectionIntro}>
            Scholars identify additional fascist tactics and behaviors that Trump exhibits, drawn from historical fascist movements:
          </p>

          <div className={styles.playbookGrid}>
            <div className={styles.playbookItem}>
              <h3>🎭 Cult of Personality</h3>
              <div className={styles.playbookContent}>
                <p className={styles.playbookDef}><strong>Fascist Tactic:</strong> Leader presented as infallible savior; demands absolute loyalty</p>
                <p className={styles.playbookTrump}><strong>Trump:</strong></p>
                <ul>
                  <li>"I alone can fix it"</li>
                  <li>Rally chants: "Trump! Trump! Trump!"</li>
                  <li>Golden statue at CPAC</li>
                  <li>Demands loyalty oaths from officials</li>
                  <li>Signature on stimulus checks</li>
                  <li>Name on government buildings and projects</li>
                  <li>Fired officials for insufficient personal loyalty</li>
                </ul>
              </div>
            </div>

            <div className={styles.playbookItem}>
              <h3>📺 Propaganda and Media Control</h3>
              <div className={styles.playbookContent}>
                <p className={styles.playbookDef}><strong>Fascist Tactic:</strong> Control information; discredit independent press; create state-aligned media</p>
                <p className={styles.playbookTrump}><strong>Trump:</strong></p>
                <ul>
                  <li>Called press "enemy of the people" (Stalin, Hitler term)</li>
                  <li>$20 billion lawsuit against CBS News</li>
                  <li>FCC investigation of NPR/PBS as "communist"</li>
                  <li>Restricted White House press pool to hand-picked journalists</li>
                  <li>Cancelled AP, Reuters, AFP contracts for Voice of America</li>
                  <li>Proposed $1.1B defunding of public broadcasting</li>
                  <li>Fox News members appointed to Kennedy Center Board</li>
                  <li>43% of Republicans say Trump should have power to shut down "bad" media</li>
                </ul>
              </div>
            </div>

            <div className={styles.playbookItem}>
              <h3>👥 Scapegoating Minorities</h3>
              <div className={styles.playbookContent}>
                <p className={styles.playbookDef}><strong>Fascist Tactic:</strong> Blame societal problems on vulnerable groups; dehumanize "the other"</p>
                <p className={styles.playbookTrump}><strong>Trump:</strong></p>
                <ul>
                  <li>Called immigrants "vermin," "animals," "poisoning the blood"</li>
                  <li>Muslim ban (religious discrimination)</li>
                  <li>Revoked protected status for 532,000 people of color</li>
                  <li>Systematic persecution of transgender individuals</li>
                  <li>Immigration raids targeting Latino communities</li>
                  <li>Separated families at border</li>
                  <li>Blamed immigrants for crime, economic problems, disease</li>
                </ul>
              </div>
            </div>

            <div className={styles.playbookItem}>
              <h3>⚔️ Political Violence</h3>
              <div className={styles.playbookContent}>
                <p className={styles.playbookDef}><strong>Fascist Tactic:</strong> Encourage violence against opponents; use paramilitary groups</p>
                <p className={styles.playbookTrump}><strong>Trump:</strong></p>
                <ul>
                  <li>January 6 Capitol insurrection incitement</li>
                  <li>Vowed to pardon January 6 convicts</li>
                  <li>Proud Boys and Oath Keepers support</li>
                  <li>"Stand back and stand by" to Proud Boys</li>
                  <li>Defense of Kyle Rittenhouse</li>
                  <li>"Knock the crap out of them" at rallies</li>
                  <li>Offered to pay legal fees for violent supporters</li>
                  <li>Called for "trial by combat"</li>
                </ul>
              </div>
            </div>

            <div className={styles.playbookItem}>
              <h3>🗳️ Election Denial and Subversion</h3>
              <div className={styles.playbookContent}>
                <p className={styles.playbookDef}><strong>Fascist Tactic:</strong> Undermine democratic process; refuse to accept electoral defeat</p>
                <p className={styles.playbookTrump}><strong>Trump:</strong></p>
                <ul>
                  <li>"Stop the Steal" campaign</li>
                  <li>Attempted to prevent Biden certification</li>
                  <li>Pressured state officials to "find votes"</li>
                  <li>Fake elector scheme</li>
                  <li>70+ failed lawsuits challenging results</li>
                  <li>Still claims 2020 election was "stolen"</li>
                  <li>Undermined faith in electoral system</li>
                </ul>
              </div>
            </div>

            <div className={styles.playbookItem}>
              <h3>⚖️ Judicial Attacks</h3>
              <div className={styles.playbookContent}>
                <p className={styles.playbookDef}><strong>Fascist Tactic:</strong> Undermine independent judiciary; pack courts with loyalists</p>
                <p className={styles.playbookTrump}><strong>Trump:</strong></p>
                <ul>
                  <li>Called judges "so-called judges"</li>
                  <li>Attacked judges based on ethnicity ("Mexican judge")</li>
                  <li>Stacked Supreme Court with conservative justices</li>
                  <li>Fired prosecutors investigating him</li>
                  <li>Pardoned political allies</li>
                  <li>Threatened judges and their families</li>
                  <li>DOJ weaponization against opponents</li>
                </ul>
              </div>
            </div>

            <div className={styles.playbookItem}>
              <h3>🌍 Territorial Expansion Rhetoric</h3>
              <div className={styles.playbookContent}>
                <p className={styles.playbookDef}><strong>Fascist Tactic:</strong> "Lebensraum" - territorial expansion for national greatness</p>
                <p className={styles.playbookTrump}><strong>Trump:</strong></p>
                <ul>
                  <li>Attempted to buy Greenland</li>
                  <li>Threatened to take control of Panama Canal</li>
                  <li>"Liberation Day" rhetoric for America itself</li>
                  <li>Characterized America as "occupied country"</li>
                  <li>Historians note parallel to Nazi Lebensraum concept</li>
                </ul>
              </div>
            </div>

            <div className={styles.playbookItem}>
              <h3>🏛️ Dismantling Democratic Institutions</h3>
              <div className={styles.playbookContent}>
                <p className={styles.playbookDef}><strong>Fascist Tactic:</strong> Weaken checks and balances; centralize power in executive</p>
                <p className={styles.playbookTrump}><strong>Trump:</strong></p>
                <ul>
                  <li>DOGE to "synchronize" all government (Gleichschaltung)</li>
                  <li>Mass federal worker dismissals (20,000+ positions)</li>
                  <li>Fired dozens of Inspector Generals</li>
                  <li>Eliminated independent agency heads (NLRB, EEOC, CFPB)</li>
                  <li>Privatization of public institutions (USPS, Social Security, Medicare)</li>
                  <li>Attacks on civil service protections</li>
                </ul>
              </div>
            </div>

            <div className={styles.playbookItem}>
              <h3>📜 Historical Revisionism</h3>
              <div className={styles.playbookContent}>
                <p className={styles.playbookDef}><strong>Fascist Tactic:</strong> Rewrite history to support nationalist narrative; ban "subversive" materials</p>
                <p className={styles.playbookTrump}><strong>Trump:</strong></p>
                <ul>
                  <li>"Restoring Truth and Sanity to American History" executive order</li>
                  <li>Removal of slavery exhibits at Independence Hall</li>
                  <li>Removed materials from Smithsonian</li>
                  <li>"Patriotic education" mandate</li>
                  <li>Banned critical race theory from federal agencies</li>
                  <li>Rewrote January 6 as "legitimate political discourse"</li>
                </ul>
              </div>
            </div>

            <div className={styles.playbookItem}>
              <h3>🤐 Silencing Dissent</h3>
              <div className={styles.playbookContent}>
                <p className={styles.playbookDef}><strong>Fascist Tactic:</strong> Punish those who speak out; create climate of fear</p>
                <p className={styles.playbookTrump}><strong>Trump:</strong></p>
                <ul>
                  <li>Systematic retaliation against cabinet members who criticized him</li>
                  <li>Fired Mattis, Kelly, Esper, Bolton, Tillerson for dissent</li>
                  <li>DOJ criminal investigation of Fed Chair Powell</li>
                  <li>Revoked security clearances of critics</li>
                  <li>Called for imprisonment of political opponents</li>
                  <li>"Lock her up" chants about Hillary Clinton</li>
                  <li>Threatened "retribution" against enemies</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Additional Nazi Parallels */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            <span className={styles.icon}>⚠️</span>
            Additional Historical Parallels to Nazi Germany
          </h2>
          <p className={styles.sectionIntro}>
            Beyond the first 100 days, historians have identified additional specific parallels between Trump's actions and Nazi Germany's authoritarian tactics:
          </p>

          <div className={styles.naziParallels}>
            <div className={styles.parallelItem}>
              <h3>Immigration Registry (2025) → Jewish Registration (1938)</h3>
              <div className={styles.parallelComparison}>
                <div className={styles.parallelSide}>
                  <strong>Nazi Germany (1938):</strong>
                  <p>Required all Jews to register with government; used for tracking, persecution, and eventual deportation/genocide</p>
                </div>
                <div className={styles.parallelSide}>
                  <strong>Trump Administration (April 2025):</strong>
                  <p>Required all undocumented immigrants to register with federal government; experts warn creates database for mass deportation and persecution</p>
                </div>
              </div>
              <div className={styles.expertNote}>
                <strong>Expert Analysis:</strong> Historians note this "parallels Nazi-era laws" and could be used similarly for systematic targeting of a population.
              </div>
            </div>

            <div className={styles.parallelItem}>
              <h3>Transgender Persecution → Nazi LGBTQ+ Persecution</h3>
              <div className={styles.parallelComparison}>
                <div className={styles.parallelSide}>
                  <strong>Nazi Germany:</strong>
                  <p>Systematic persecution of LGBTQ+ individuals; Institute for Sexual Science destroyed; thousands sent to concentration camps</p>
                </div>
                <div className={styles.parallelSide}>
                  <strong>Trump Administration:</strong>
                  <p>Declared only two sexes recognized; systematic removal of transgender rights; rolled back LGBTQ protections; experts call it "most concerted anti-trans push since Nazis' ascension to power"</p>
                </div>
              </div>
            </div>

            <div className={styles.parallelItem}>
              <h3>Gleichschaltung (Coordination) → DOGE Synchronization</h3>
              <div className={styles.parallelComparison}>
                <div className={styles.parallelSide}>
                  <strong>Nazi Germany:</strong>
                  <p>"Gleichschaltung" - forced coordination of all government organs, institutions, and organizations under Nazi control; eliminated independence of civil service, judiciary, military</p>
                </div>
                <div className={styles.parallelSide}>
                  <strong>Trump Administration:</strong>
                  <p>DOGE created to "synchronize" all government operations under executive control; mass dismissals of "disloyal" workers; elimination of independent agencies</p>
                </div>
              </div>
              <div className={styles.expertNote}>
                <strong>Expert Analysis:</strong> Historians explicitly use the term "Gleichschaltung" to describe DOGE's mission.
              </div>
            </div>

            <div className={styles.parallelItem}>
              <h3>Lebensraum (Living Space) → Greenland/Panama Expansion</h3>
              <div className={styles.parallelComparison}>
                <div className={styles.parallelSide}>
                  <strong>Nazi Germany:</strong>
                  <p>"Lebensraum" ideology - territorial expansion necessary for national greatness and resources; justified invasion of neighboring countries</p>
                </div>
                <div className={styles.parallelSide}>
                  <strong>Trump Administration:</strong>
                  <p>Attempted to buy Greenland for resources; threatened to take Panama Canal; rhetoric about territorial expansion for American greatness</p>
                </div>
              </div>
            </div>

            <div className={styles.parallelItem}>
              <h3>Führerprinzip (Leader Principle) → Executive Order Avalanche</h3>
              <div className={styles.parallelComparison}>
                <div className={styles.parallelSide}>
                  <strong>Nazi Germany:</strong>
                  <p>"Führerprinzip" - absolute authority concentrated in the leader; leader's will becomes law; no checks on executive power</p>
                </div>
                <div className={styles.parallelSide}>
                  <strong>Trump Administration:</strong>
                  <p>229 executive orders in first year of second term; used to bypass Congress; centralize legal authority in president; circumvent democratic process</p>
                </div>
              </div>
              <div className={styles.expertNote}>
                <strong>Expert Analysis:</strong> Matthew Finkin (Illinois Law): Trump's actions parallel Hitler's "Machtergreifung" (Seizure of Power).
              </div>
            </div>

            <div className={styles.parallelItem}>
              <h3>Reichstag Fire → Potential "Functional Equivalent"</h3>
              <div className={styles.parallelComparison}>
                <div className={styles.parallelSide}>
                  <strong>Nazi Germany (1933):</strong>
                  <p>Reichstag Fire used as pretext to suspend civil liberties, eliminate opposition, consolidate power through emergency decree</p>
                </div>
                <div className={styles.parallelSide}>
                  <strong>Trump Administration:</strong>
                  <p>Werner Lange warns: "The functional equivalent of the Reichstag Fire would suffice" to justify mass incarceration of dissenters and cancellation of elections. Border "emergency" already used for extraordinary powers.</p>
                </div>
              </div>
              <div className={styles.warningBox}>
                <strong>⚠️ Scholar Warning:</strong> "Any significant domestic escalation of violence by the Resistance (or agent provocateurs) may provide the excuse for mass incarceration of dissenters and cancellation of midterm elections."
              </div>
            </div>

            <div className={styles.parallelItem}>
              <h3>Concentration Camp Evolution → CECOT/Guantanamo Usage</h3>
              <div className={styles.parallelComparison}>
                <div className={styles.parallelSide}>
                  <strong>Nazi Germany:</strong>
                  <p>Dachau opened March 1933 for political opponents; gradually expanded to religious minorities, LGBTQ+, then Jews; normalized detention without trial</p>
                </div>
                <div className={styles.parallelSide}>
                  <strong>Trump Administration:</strong>
                  <p>Sent 50+ Venezuelans to Guantanamo; 250+ to El Salvador's CECOT super-max prison; proposed military bases for immigrant detention; pattern of expanding targets</p>
                </div>
              </div>
              <div className={styles.expertNote}>
                <strong>Historical Pattern:</strong> Nazi regime's expansion of persecution - first political opposition, then religious minorities and LGBTQ, then Jews - suggests pattern of expanding targets over time.
              </div>
            </div>
          </div>

          <div className={styles.importantCaveat}>
            <h3>Critical Scholarly Caveat:</h3>
            <p><strong>All historians emphasize Trump has not targeted groups "for murder."</strong> These comparisons focus on the <em>early Nazi period (1933-1934) democratic erosion</em>, not Holocaust equivalency. The parallels are about authoritarian consolidation tactics, not genocide. However, scholars warn these are the same tactics that <em>enabled</em> later atrocities by normalizing persecution and eliminating democratic safeguards.</p>
          </div>
        </section>

        {/* Expert Warnings */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            <span className={styles.icon}>🎓</span>
            What Leading Experts Say
          </h2>

          <div className={styles.expertGrid}>
            <div className={styles.expertCard}>
              <h3>Robert Paxton</h3>
              <p className={styles.credentials}>Columbia University, Leading Fascism Expert</p>
              <p className={styles.quote}>"Trump's incitement of the invasion of the Capitol on January 6, 2020 removes my objection to the fascist label. The label now seems not just acceptable but <strong>necessary</strong>."</p>
              <p className={styles.note}>Note: Paxton previously resisted calling Trump fascist but changed position after January 6</p>
            </div>

            <div className={styles.expertCard}>
              <h3>Timothy Snyder</h3>
              <p className={styles.credentials}>Yale University, Professor of History</p>
              <p className={styles.quote}>"Trump has always been a presence, not an absence: the presence of fascism. We're not wiser than Germans in the 1930s, and our institutions don't defend themselves."</p>
            </div>

            <div className={styles.expertCard}>
              <h3>Jason Stanley</h3>
              <p className={styles.credentials}>Yale University, Jacob Urowsky Professor of Philosophy</p>
              <p className={styles.quote}>"We don't have another word for something that looks so much like fascism. By calling Trump a 'fascist,' I'm trying to spark public alarm."</p>
            </div>

            <div className={styles.expertCard}>
              <h3>Ruth Ben-Ghiat</h3>
              <p className={styles.credentials}>NYU, Professor of History and Italian Studies</p>
              <p className={styles.quote}>"It is beyond doubt that Trump has provided a new stage and a new context for fascist ideologies and practices. Calling people 'vermin' was used by Hitler and Mussolini to dehumanize and encourage violence."</p>
            </div>

            <div className={styles.expertCard}>
              <h3>Federico Finchelstein</h3>
              <p className={styles.credentials}>The New School, Professor of History</p>
              <p className={styles.quote}>"When populists reject electoral results in addition to violence, racism, and other fascist traits, you have something that sounds less like populism and more like fascism. Trump now fits the definition of a fascist."</p>
              <p className={styles.note}>Note: Also changed position after January 6</p>
            </div>

            <div className={styles.expertCard}>
              <h3>Anne Berg</h3>
              <p className={styles.credentials}>University of Pennsylvania, Historian</p>
              <p className={styles.quote}>"We no longer live in a functioning democratic society. We are watching the making of a dictatorship in real time."</p>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className={styles.callToAction}>
          <h2>Why This Matters</h2>
          <p>
            This is not about partisan politics. Leading scholars across the ideological spectrum—Holocaust historians, political scientists, and experts on authoritarianism—are raising alarms based on historical patterns and decades of research.
          </p>
          <p>
            <strong>The parallels are not perfect.</strong> Trump has not targeted groups for murder. The United States in 2025 is not Weimar Germany. But the scholars warning us are the very people we rely on to understand how democracies die. They're telling us that the warning signs are unmistakable.
          </p>
          <div className={styles.finalWarning}>
            <p>
              <strong>History doesn't repeat, but it rhymes.</strong> The question is whether we're willing to listen to those who have studied these patterns their entire careers—or whether we'll repeat the mistakes of those who dismissed early warning signs as "exaggeration" until it was too late.
            </p>
          </div>
        </section>

        {/* Sources */}
        <section className={styles.sources}>
          <h2>Sources</h2>
          <ul>
            <li><a href="https://www.commondreams.org/opinion/hitler-trump-first-100-days" target="_blank" rel="noopener noreferrer">CommonDreams: Hitler's First 100 Days — And Trump's</a></li>
            <li><a href="https://en.wikipedia.org/wiki/Donald_Trump_and_fascism" target="_blank" rel="noopener noreferrer">Wikipedia: Donald Trump and fascism</a></li>
            <li><a href="https://www.france24.com/en/americas/20250307-what-parallels-do-historians-see-between-the-trump-administration-and-the-nazi-regime" target="_blank" rel="noopener noreferrer">France24: What parallels do historians see between Trump and the Nazi regime</a></li>
            <li><a href="https://digitalcommons.gardner-webb.edu/cgi/viewcontent.cgi?article=1061&context=undergrad-honors" target="_blank" rel="noopener noreferrer">Gardner-Webb University: Rhetorical Demagoguery - Trump and Hitler's Rise to Power</a></li>
          </ul>
        </section>
      </div>
    </Layout>
  );
}
