(function(){
  'use strict';

  const MOFA_SUBJECT_ID='toeffli';
  const EXAM_KEY='built_mofa_exam_v1';
  const BEST_KEY='built_mofa_best_v1';
  const QUESTIONS=[{"id":"m1","topic":"Vortritt","prompt":"Du kommst mit dem Töffli an eine nicht signalisierte Verzweigung gleichwertiger Strassen.","s":[["Ein Fahrzeug, das von rechts kommt, hat grundsätzlich Vortritt.",true,"Bei gleichwertigen, nicht anders geregelten Verzweigungen gilt Rechtsvortritt."],["Mit dem Töffli hast du automatisch Vortritt, weil dein Fahrzeug kleiner und langsamer ist.",false,"Fahrzeuggrösse oder Geschwindigkeit geben keinen automatischen Vortritt."],["Signale oder Weisungen der Polizei können den allgemeinen Rechtsvortritt ersetzen.",true,"Eine besondere Regelung durch Signale oder Polizei geht der allgemeinen Vortrittsregel vor."]]},{"id":"m2","topic":"Hauptstrasse","prompt":"Du fährst auf einer gekennzeichneten Hauptstrasse. Von einer Nebenstrasse nähert sich ein Auto.","s":[["Du hast auf der gekennzeichneten Hauptstrasse grundsätzlich Vortritt.",true,"Fahrzeuge auf gekennzeichneten Hauptstrassen haben gegenüber einmündenden Nebenstrassen grundsätzlich Vortritt."],["Rechtsvortritt gilt immer und hebt den Vortritt der Hauptstrasse auf.",false,"Die Hauptstrassenregel geht dem allgemeinen Rechtsvortritt vor."],["Auch mit Vortritt musst du aufmerksam fahren und eine erkennbare Gefahr vermeiden.",true,"Vortritt entbindet nicht von der allgemeinen Sorgfaltspflicht."]]},{"id":"m3","topic":"Signal · Stop","prompt":"Du siehst dieses Signal an einer Verzweigung. Wie verhältst du dich?","image":"https://commons.wikimedia.org/wiki/Special:Redirect/file/CH-Vortrittssignal-Stop.svg?width=640","alt":"Schweizer Stop-Signal","cls":"sign","credit":"Signal 3.01 · ASTRA · Public Domain · Wikimedia Commons","source":"https://commons.wikimedia.org/wiki/File:CH-Vortrittssignal-Stop.svg","s":[["Beim Stop-Signal musst du vollständig anhalten.",true,"Ein Rollstopp genügt beim Stop-Signal nicht."],["Wenn eine Haltelinie vorhanden ist, hältst du bei dieser Linie an.",true,"Die Haltelinie bezeichnet die Stelle, an der anzuhalten ist."],["Wenn die Strasse frei aussieht, darfst du ohne vollständiges Anhalten langsam weiterrollen.",false,"Auch bei freier Sicht verlangt das Stop-Signal ein vollständiges Anhalten."]]},{"id":"m4","topic":"Signal · Kein Vortritt","prompt":"Du näherst dich einer Verzweigung mit diesem Signal.","image":"https://commons.wikimedia.org/wiki/Special:Redirect/file/CH-Vortrittssignal-Kein%20Vortritt.svg?width=640","alt":"Schweizer Signal Kein Vortritt","cls":"sign","credit":"Signal 3.02 · ASTRA · Public Domain · Wikimedia Commons","source":"https://commons.wikimedia.org/wiki/File:CH-Vortrittssignal-Kein_Vortritt.svg","s":[["Du musst dem Verkehr auf der vortrittsberechtigten Strasse den Vortritt lassen.",true,"Das Signal «Kein Vortritt» verpflichtet dich, den vortrittsberechtigten Verkehr durchzulassen."],["Du musst in jedem Fall vollständig anhalten, auch wenn niemand kommt.",false,"Ein vollständiger Halt ist beim Stop-Signal vorgeschrieben, nicht automatisch bei «Kein Vortritt»."],["Du musst dich so nähern, dass du nötigenfalls rechtzeitig anhalten kannst.",true,"Du musst den Vortritt sicher gewähren können."]]},{"id":"m5","topic":"Strassenbahn","prompt":"Du fährst auf einer Strasse mit Tramgleisen. Welche Regeln sind wichtig?","image":"https://commons.wikimedia.org/wiki/Special:Redirect/file/Z%C3%BCrich_Albisriederstrasse_%282023%29_02.jpg?width=1100","alt":"Strasse mit Tramgleisen in Zürich","credit":"Foto: Balise42 · CC BY-SA 4.0 · Wikimedia Commons","source":"https://commons.wikimedia.org/wiki/File:Z%C3%BCrich_Albisriederstrasse_(2023)_02.jpg","s":[["Du musst das Geleise freigeben und der Strassenbahn grundsätzlich den Vortritt lassen.",true,"Das Strassenverkehrsgesetz verlangt, das Geleise freizugeben und der Strassenbahn den Vortritt zu lassen."],["Eine fahrende Strassenbahn wird grundsätzlich rechts überholt; wenn das nicht möglich ist, darf sie links überholt werden.",true,"So regelt das SVG das Überholen einer fahrenden Strassenbahn."],["Ein Töffli hat gegenüber einer Strassenbahn automatisch Vortritt, weil es kleiner ist.",false,"Für Motorfahrräder besteht kein solcher Vorrang."]]},{"id":"m6","topic":"Kreisverkehr","prompt":"Du näherst dich mit dem Töffli einem Kreisverkehr.","image":"https://commons.wikimedia.org/wiki/Special:Redirect/file/Kreisverkehr_ETA_Werk_5_Bettlach_%28cropped%29.jpg?width=1100","alt":"Kreisverkehr in Bettlach, Schweiz","credit":"Foto: Gestumblindi · CC BY-SA 4.0 · Wikimedia Commons","source":"https://commons.wikimedia.org/wiki/File:Kreisverkehr_ETA_Werk_5_Bettlach_(cropped).jpg","s":[["Vor der Einfahrt reduzierst du die Geschwindigkeit und lässt den im Kreis von links herannahenden Fahrzeugen den Vortritt.",true,"Beim Kreisverkehr ist die Geschwindigkeit vor der Einfahrt zu mässigen und dem Verkehr im Kreis Vortritt zu gewähren."],["Beim normalen Einfahren ohne Fahrstreifenwechsel musst du zwingend links blinken.",false,"Ein allgemeines Linksblinken beim Einfahren ist nicht vorgeschrieben."],["Beim Verlassen des Kreisverkehrs musst du den Richtungswechsel anzeigen.",true,"Das Verlassen des Kreisverkehrs ist anzuzeigen."]]},{"id":"m7","topic":"Linksabbiegen","prompt":"Du möchtest an einer normalen Verzweigung nach links abbiegen.","s":[["Du zeigst den Richtungswechsel rechtzeitig an.",true,"Jede Richtungsänderung muss rechtzeitig angezeigt werden."],["Du hältst dich zum Linksabbiegen grundsätzlich gegen die Strassenmitte.",true,"Das SVG verlangt beim Linksabbiegen grundsätzlich das Einordnen gegen die Strassenmitte."],["Der entgegenkommende Verkehr muss dir beim Linksabbiegen Vortritt lassen.",false,"Vor dem Linksabbiegen musst du den entgegenkommenden Fahrzeugen den Vortritt lassen."]]},{"id":"m8","topic":"Überholen","prompt":"Du willst ein langsameres Fahrzeug überholen.","s":[["Grundsätzlich wird links überholt.",true,"In der Schweiz wird rechts gekreuzt und links überholt."],["Du darfst nur überholen, wenn der nötige Raum übersichtlich und frei ist und der Gegenverkehr nicht behindert wird.",true,"Diese Bedingungen nennt das Strassenverkehrsgesetz ausdrücklich."],["Wer überholt wird, darf während des Überholvorgangs beschleunigen.",false,"Das überholte Fahrzeug darf seine Geschwindigkeit nicht erhöhen."]]},{"id":"m9","topic":"Fussgängerstreifen","prompt":"Du näherst dich diesem Bereich. Eine Person will den Fussgängerstreifen betreten.","image":"https://commons.wikimedia.org/wiki/Special:Redirect/file/Pedestrian_crossing_road_sign_in_Switzerland.jpg?width=900","alt":"Fussgängerstreifen-Signal in der Schweiz","credit":"Foto: International Driving Authority · CC BY-SA 4.0 · Wikimedia Commons","source":"https://commons.wikimedia.org/wiki/File:Pedestrian_crossing_road_sign_in_Switzerland.jpg","s":[["Vor dem Fussgängerstreifen fährst du besonders vorsichtig und hältst nötigenfalls an.",true,"Vor Fussgängerstreifen ist besonders vorsichtig zu fahren und nötigenfalls anzuhalten."],["Fussgänger, die sich bereits auf dem Streifen befinden oder im Begriff sind ihn zu betreten, haben Vortritt.",true,"Diesen Fussgängern ist der Vortritt zu lassen."],["Ein Fahrzeug, das vor dem Fussgängerstreifen für Fussgänger anhält, darfst du mit dem Töffli überholen.",false,"Ein Fahrzeug, das dort für Fussgänger anhält, darf nicht überholt werden."]]},{"id":"m10","topic":"Bahnübergang","prompt":"Du näherst dich einem Bahnübergang.","s":[["Auf und unmittelbar vor einem Bahnübergang ohne Schranken darfst du nicht überholen.",true,"Das SVG nennt diese Stelle ausdrücklich als Überholverbot."],["Wenn sich die Schranke schliesst oder ein Warnlicht signalisiert, hältst du vor dem Übergang an.",true,"Ein gesicherter Bahnübergang darf bei Warnung nicht befahren werden."],["Mit einem schmalen Töffli darfst du noch an der sich schliessenden Schranke vorbeifahren.",false,"Die geringe Fahrzeugbreite schafft keine Ausnahme."]]},{"id":"m11","topic":"Polizei & Weisungen","prompt":"Eine Polizistin regelt an einer Verzweigung den Verkehr.","s":[["Die Weisungen der Polizei können den normalen Vortrittsregeln und Lichtsignalen vorgehen.",true,"Polizeiliche Verkehrsregelung ist vorrangig zu beachten."],["Bei grünem Licht darfst du die Handzeichen der Polizistin ignorieren.",false,"Die Weisungen der Polizei gehen einem widersprechenden Lichtsignal vor."],["Auch Weisungen anderer dazu berechtigter Personen musst du beachten.",true,"Zur Verkehrsregelung berechtigte Personen können verbindliche Weisungen geben."]]},{"id":"m12","topic":"Tunnel","prompt":"Du fährst mit dem Töffli durch einen Strassentunnel.","image":"https://commons.wikimedia.org/wiki/Special:Redirect/file/Sins_S%C3%BCdwestumfahrung_Tunnel_Letten.jpg?width=1100","alt":"Strassentunnel in Sins, Aargau","credit":"Foto: Arkelin · CC BY 4.0 · Wikimedia Commons","source":"https://commons.wikimedia.org/wiki/File:Sins_S%C3%BCdwestumfahrung_Tunnel_Letten.jpg","s":[["Dein Fahrzeug muss im Tunnel beleuchtet sein.",true,"Im Tunnel ist die vorgeschriebene Beleuchtung zu verwenden."],["Wenden oder Rückwärtsfahren ist erlaubt, wenn du gerade keinen Verkehr siehst.",false,"Wenden und Rückwärtsfahren sind im Tunnel grundsätzlich verboten."],["Im Tunnel hältst du grundsätzlich nur in einem Notfall an.",true,"Unnötiges Anhalten im Tunnel schafft erhebliche Gefahren."]]},{"id":"m13","topic":"Signal · Motorfahrradverbot","prompt":"Was bedeutet dieses Schweizer Vorschriftssignal für dich?","image":"https://commons.wikimedia.org/wiki/Special:Redirect/file/CH-Vorschriftssignal-Verbot%20f%C3%BCr%20Motorfahrr%C3%A4der.svg?width=640","alt":"Schweizer Signal Verbot für Motorfahrräder","cls":"sign","credit":"Signal · ASTRA · Public Domain · Wikimedia Commons","source":"https://commons.wikimedia.org/wiki/File:CH-Vorschriftssignal-Verbot_f%C3%BCr_Motorfahrr%C3%A4der.svg","s":[["Mit einem Motorfahrrad darfst du diese Strecke nicht befahren.",true,"Das Signal bedeutet ausdrücklich «Verbot für Motorfahrräder»."],["Das Verbot gilt nur für Personenwagen und Lastwagen.",false,"Das abgebildete Symbol bezieht sich gerade auf Motorfahrräder."],["Du musst mit dem Töffli eine andere erlaubte Route wählen.",true,"Ohne signalisierte Ausnahme darfst du die verbotene Strecke nicht benutzen."]]},{"id":"m14","topic":"Signal · Einfahrt verboten","prompt":"Du möchtest von dieser Seite in eine Strasse einfahren.","image":"https://commons.wikimedia.org/wiki/Special:Redirect/file/CH-Vorschriftssignal-Einfahrt%20verboten.svg?width=640","alt":"Schweizer Signal Einfahrt verboten","cls":"sign","credit":"Signal 2.02 · ASTRA · Public Domain · Wikimedia Commons","source":"https://commons.wikimedia.org/wiki/File:CH-Vorschriftssignal-Einfahrt_verboten.svg","s":[["Du darfst mit dem Töffli grundsätzlich nicht von dieser Seite einfahren.",true,"«Einfahrt verboten» untersagt die Einfahrt in der angezeigten Richtung, sofern keine Ausnahme signalisiert ist."],["Das Signal betrifft nur Autos und Lastwagen, nicht aber Motorfahrräder.",false,"Das Signal ist kein reines Autoverbot."],["Ohne eine ausdrücklich signalisierte Ausnahme musst du eine andere erlaubte Zufahrt wählen.",true,"Eine Ausnahme muss sich aus der Signalisation ergeben."]]},{"id":"m15","topic":"Geschwindigkeit","prompt":"Es beginnt stark zu regnen und die Fahrbahn wird rutschig.","s":[["Du passt deine Geschwindigkeit an Strasse, Sicht und Wetter an.",true,"Die Fahrweise muss den tatsächlichen Verhältnissen angepasst werden."],["Auch als Motorfahrrad musst du allgemeine und signalisierte Höchstgeschwindigkeiten beachten.",true,"Motorfahrradführer müssen die Höchstgeschwindigkeiten einhalten."],["Weil ein Töffli langsam ist, kannst du bei Nässe immer mit gleicher Geschwindigkeit weiterfahren.",false,"Nässe vermindert Haftung und Sicherheitsreserven."]]},{"id":"m16","topic":"Fahrzeug · Betriebssicherheit","prompt":"Welche Aussagen gehören beim klassischen Motorfahrrad zur prüfungsrelevanten Betriebssicherheit?","s":[["Eine Abstellstütze gehört zur vorgeschriebenen Ausrüstung.",true,"Der offizielle Kompetenzkatalog Kategorie M führt die Abstellstütze als Mindestanforderung auf."],["Die Nutzleistung beträgt beim klassischen Motorfahrrad höchstens 1,0 kW.",true,"Der Kat.-M-Kompetenzkatalog nennt maximal 1,0 kW Nutzleistung."],["Beim klassischen Motorfahrrad gehört der Pedalantrieb zu den technischen Anforderungen.",true,"Der Pedalantrieb wird im offiziellen Kat.-M-Kompetenzkatalog als erforderlich aufgeführt."]]},{"id":"m17","topic":"Fahrzeug · Sicherheitsausrüstung","prompt":"Du kontrollierst dein klassisches Töffli vor der Fahrt.","s":[["Vorne braucht es Abblendlicht und hinten ein Schlusslicht.",true,"Diese Beleuchtung gehört zur prüfungsrelevanten Sicherheitsausrüstung."],["An den Pedalen gehören Rückstrahler nach vorne und hinten.",true,"Pedalrückstrahler sind im Kat.-M-Kompetenzkatalog aufgeführt."],["Links braucht es einen Aussenspiegel mit mindestens 50 cm² Fläche.",true,"Der offizielle Kompetenzkatalog nennt einen linken Aussenspiegel mit mindestens 50 cm²."]]},{"id":"m18","topic":"Helm","prompt":"Welche Aussagen zur Helmtragpflicht bei Motorfahrrädern sind richtig?","s":[["Auf einem klassischen Motorfahrrad ist grundsätzlich ein Schutzhelm zu tragen.",true,"Für klassische Motorfahrräder besteht grundsätzlich Helmtragpflicht."],["Auf einem Motorfahrrad kann ein nach SN EN 1078 geprüfter Fahrradhelm die Helm-Anforderung erfüllen.",true,"Die aktuelle VRV nennt auf Motorfahrrädern einen Fahrradhelm nach SN EN 1078 als genügend."],["Für jedes Motorfahrrad ohne Ausnahme ist zwingend ein Motorradhelm nach UNECE-Reglement 22 nötig.",false,"Die Regeln kennen Ausnahmen; auf Motorfahrrädern genügt unter den gesetzlichen Voraussetzungen auch ein EN-1078-Fahrradhelm."]]},{"id":"m19","topic":"Ausweise & Kontrollschild","prompt":"Du prüfst die amtlichen Unterlagen und das Kontrollschild deines Töfflis.","s":[["Der Fahrzeugausweis gehört zu den amtlichen Unterlagen des Motorfahrrads.",true,"Der Fahrzeugausweis ist Bestandteil der allgemeinen Zulassungsvorschriften."],["Das Kontrollschild muss hinten gut sichtbar angebracht sein und darf nicht verändert oder verbogen werden.",true,"Das Schild muss erkennbar und ordnungsgemäss angebracht sein."],["Ein verlorenes oder gestohlenes Kontrollschild kannst du bis zur nächsten Jahreskontrolle einfach ignorieren.",false,"Verlust oder Diebstahl muss ordnungsgemäss behandelt und das Schild ersetzt werden."]]},{"id":"m20","topic":"Verantwortung","prompt":"Vor der Fahrt bist du müde und wirst während der Fahrt durch dein Handy abgelenkt.","s":[["Du darfst nur fahren, wenn du fahrfähig bist und dem Verkehr genügend Aufmerksamkeit schenken kannst.",true,"Fahrfähigkeit und Aufmerksamkeit sind zentrale Pflichten."],["Alkohol kann deine Fahrfähigkeit beeinträchtigen, auch wenn ein Töffli langsamer ist als ein Auto.",true,"Alkohol beeinträchtigt Wahrnehmung und Reaktion unabhängig vom Fahrzeugtyp."],["Handy-Ablenkung ist beim Töffli ungefährlich, weil die Geschwindigkeit tief ist.",false,"Ablenkung kann auch bei tieferen Geschwindigkeiten zu gefährlichen Reaktionsfehlern führen."]]},{"id":"m21","topic":"Nasse Fahrbahn","prompt":"Die Fahrbahn ist nass und stellenweise rutschig.","s":[["Du reduzierst deine Geschwindigkeit.",true,"Weniger Haftung verlangt eine angepasste Geschwindigkeit."],["Du vergrösserst den Sicherheitsabstand.",true,"Auf rutschiger Fahrbahn kann der Bremsweg länger werden."],["Du bremst und lenkst möglichst vorausschauend und gleichmässig.",true,"Ruhige Fahrmanöver verringern die Gefahr des Wegrutschens."]]},{"id":"m22","topic":"Abstand","prompt":"Du fährst hinter einem anderen Fahrzeug und wirst kurz darauf von einem Auto überholt.","s":[["Beim Hintereinanderfahren musst du genügend Abstand einhalten.",true,"Ausreichender Abstand schafft Reaktions- und Bremsreserve."],["Auch beim Kreuzen und Überholen ist ausreichender seitlicher Abstand wichtig.",true,"Das SVG verlangt ausreichenden Abstand gegenüber allen Strassenbenützern."],["Sehr dichtes Auffahren ist sicherer, weil der Abstand zum vorderen Fahrzeug dann kleiner ist.",false,"Ein kleinerer Abstand verringert deine Reaktionsreserve."]]},{"id":"m23","topic":"Kinder","prompt":"Mehrere Kinder stehen direkt am Fahrbahnrand und spielen miteinander.","s":[["Du reduzierst die Geschwindigkeit und bist bremsbereit.",true,"Bei Kindern muss mit plötzlichem Verhalten gerechnet werden."],["Du kannst darauf vertrauen, dass Kinder Verkehrssituationen immer zuverlässig beurteilen.",false,"Kinder können Geschwindigkeiten und Gefahren weniger zuverlässig einschätzen."],["Du beobachtest die Situation besonders aufmerksam und rechnest damit, dass ein Kind auf die Fahrbahn laufen könnte.",true,"Vorausschauendes Fahren schützt besonders gefährdete Verkehrsteilnehmende."]]},{"id":"m24","topic":"Lastwagen · Toter Winkel","prompt":"Du fährst rechts neben einem Lastwagen, der sich einer Verzweigung nähert.","s":[["Du rechnest mit grossen Bereichen, die der Lastwagenfahrer nicht direkt sehen kann.",true,"Lastwagen haben ausgeprägte tote Winkel."],["Du bleibst nicht unnötig lange direkt rechts neben dem Lastwagen, besonders wenn er abbiegen könnte.",true,"Beim Rechtsabbiegen kann ein Zweirad im toten Winkel übersehen werden."],["Je näher du seitlich am Lastwagen fährst, desto sicherer kann dich der Fahrer sehen.",false,"Gerade sehr nahe Bereiche können im toten Winkel liegen."]]},{"id":"m25","topic":"Radweg & Trottoir","prompt":"Du fährst mit einem klassischen Töffli durch die Stadt.","s":[["Führer von Motorfahrrädern müssen grundsätzlich die Vorschriften für Radfahrer beachten.",true,"Die Verkehrsregelnverordnung verweist Motorfahrradführer grundsätzlich auf die Radfahrerregeln."],["Für das klassische Töffli sind die dafür vorgesehenen Radwege und Radstreifen grundsätzlich zu benützen.",true,"Motorfahrräder folgen grundsätzlich den entsprechenden Radfahrerregeln; spezielle Fahrzeugkategorien können abweichen."],["Das Trottoir ist eine normale Fahrspur für Töfflis, wenn auf der Strasse viel Verkehr ist.",false,"Das Trottoir ist grundsätzlich dem Fussverkehr vorbehalten."]]},{"id":"m26","topic":"Nebeneinanderfahren","prompt":"Du bist mit einem Kollegen auf zwei Töfflis unterwegs.","s":[["Grundsätzlich fahrt ihr hintereinander und nicht nebeneinander.",true,"Fahrräder und Motorfahrräder dürfen grundsätzlich nicht nebeneinander fahren."],["Es gibt begrenzte Ausnahmen, in denen zwei nebeneinander fahren dürfen, sofern der übrige Verkehr nicht behindert wird.",true,"Die VRV nennt bestimmte Ausnahmen, etwa bei dichtem Verkehr, grösseren Verbänden, auf bestimmten Radwegen oder in Begegnungszonen."],["Zu dritt nebeneinander zu fahren ist immer erlaubt, solange ihr unter 30 km/h bleibt.",false,"Die gesetzlichen Ausnahmen erlauben nicht allgemein drei nebeneinander fahrende Motorfahrräder."]]},{"id":"m27","topic":"Haltestelle","prompt":"Ein Bus hält an einer Haltestelle. Personen steigen aus und könnten deine Fahrbahn kreuzen.","s":[["Du nimmst auf ein- und aussteigende Personen besondere Rücksicht.",true,"Das SVG verlangt an Haltestellen Rücksicht auf ein- und aussteigende Personen."],["Nach einem Klingelzeichen darfst du mit unveränderter Geschwindigkeit weiterfahren, auch wenn jemand in deinen Weg treten könnte.",false,"Ein Warnzeichen gibt dir keinen Vortritt und ersetzt nicht die nötige Vorsicht."],["Du passt die Geschwindigkeit an und bist nötigenfalls bremsbereit.",true,"So kannst du auf Personen reagieren, die deinen Fahrweg betreten."]]},{"id":"m28","topic":"Umwelt","prompt":"Du möchtest dein Töffli möglichst umwelt- und rücksichtsvoll benutzen.","s":[["Du vermeidest unnötigen Lärm und vermeidbare Rauchentwicklung.",true,"Lärm und Rauchbildung gehören zu den prüfungsrelevanten Umweltbelastungen."],["Den Motor im Stand ohne Grund hochzudrehen ist eine rücksichtsvolle Fahrweise.",false,"Unnötiges Hochdrehen erzeugt vermeidbaren Lärm und Emissionen."],["Den Auspuff absichtlich lauter zu machen verbessert den Umweltschutz.",false,"Zusätzlicher unnötiger Lärm ist nicht umweltschonend."]]},{"id":"m29","topic":"Anhalten & Abstellen","prompt":"Du willst dein Töffli anhalten und danach für einige Minuten verlassen.","s":[["Du darfst das Fahrzeug nicht dort abstellen, wo es den Verkehr gefährdet oder behindert.",true,"Fahrzeuge dürfen nicht an gefährlichen oder behindernden Stellen abgestellt werden."],["Vor dem Verlassen sicherst du das Fahrzeug angemessen.",true,"Das SVG verlangt eine angemessene Sicherung des verlassenen Fahrzeugs."],["Wenn du weniger als fünf Minuten weg bist, darfst du überall anhalten.",false,"Eine kurze Dauer hebt Halteverbote und Sicherheitsregeln nicht auf."]]},{"id":"m30","topic":"Zeichengebung & Einfügen","prompt":"Du willst vom Strassenrand in den fliessenden Verkehr einfahren.","s":[["Du kündigst die Richtungsänderung rechtzeitig mit Richtungsanzeiger oder deutlichem Handzeichen an.",true,"Das Einfügen in den Verkehr muss rechtzeitig angezeigt werden."],["Das gegebene Zeichen entbindet dich nicht von der nötigen Vorsicht.",true,"Das SVG sagt ausdrücklich, dass Zeichengebung die Sorgfaltspflicht nicht aufhebt."],["Beim Einfügen hast du Vortritt gegenüber den Fahrzeugen, die bereits auf der Strasse fahren.",false,"Wer sich in den Verkehr einfügt, darf andere Strassenbenützer nicht behindern; diese haben Vortritt."]]}];

  function esc(value){
    return String(value).replace(/[&<>"']/g,function(m){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]});
  }

  function seedSubject(){
    if(typeof subjects==='undefined' || !Array.isArray(subjects)) return;
    if(!subjects.some(function(s){return s.id===MOFA_SUBJECT_ID;})){
      subjects.unshift({id:MOFA_SUBJECT_ID,name:'Töffli Theorie',desc:'Kategorie M · 30 Prüfungsfragen · mit Bildern',icon:'🛵'});
      localStorage.setItem('lernwelt_subjects_v2',JSON.stringify(subjects));
    }
    if(typeof renderSubjects==='function') renderSubjects();
  }

  function activeSubject(){
    if(typeof getActiveSubject==='function') return getActiveSubject();
    if(typeof subjects!=='undefined' && typeof activeSubjectId!=='undefined') return subjects.find(function(s){return s.id===activeSubjectId;})||null;
    return null;
  }

  function ensureHost(){
    const workspace=document.getElementById('testsWorkspace');
    if(!workspace) return null;
    let host=document.getElementById('testsContent');
    if(!host){
      host=document.createElement('div');
      host.id='testsContent';
      const old=workspace.querySelector('.card.panel');
      if(old) old.replaceWith(host); else workspace.appendChild(host);
    }
    return host;
  }

  function defaultState(){
    return {started:false,submitted:false,index:0,answers:{},startedAt:null,submittedAt:null};
  }

  function loadState(){
    try{
      const raw=JSON.parse(localStorage.getItem(EXAM_KEY)||'null');
      if(raw && typeof raw==='object' && raw.answers && typeof raw.answers==='object') return raw;
    }catch(e){}
    return defaultState();
  }

  let state=loadState();
  let timerId=null;

  function saveState(){localStorage.setItem(EXAM_KEY,JSON.stringify(state));}
  function clearTimer(){if(timerId){clearInterval(timerId);timerId=null;}}

  function answeredCount(){
    let count=0;
    QUESTIONS.forEach(function(q){
      const a=state.answers[q.id]||{};
      q.s.forEach(function(_,i){if(typeof a[i]==='boolean')count++;});
    });
    return count;
  }

  function questionComplete(q){
    const a=state.answers[q.id]||{};
    return q.s.every(function(_,i){return typeof a[i]==='boolean';});
  }

  function remainingSeconds(){
    if(!state.startedAt) return 45*60;
    return Math.max(0,45*60-Math.floor((Date.now()-state.startedAt)/1000));
  }

  function formatTime(sec){
    return String(Math.floor(sec/60)).padStart(2,'0')+':'+String(sec%60).padStart(2,'0');
  }

  function scoreExam(){
    let score=0;
    QUESTIONS.forEach(function(q){
      const a=state.answers[q.id]||{};
      q.s.forEach(function(st,i){if(a[i]===st[1])score++;});
    });
    return score;
  }

  function renderIntro(host){
    const best=Number(localStorage.getItem(BEST_KEY)||0);
    host.innerHTML=`
      <div class="mofa-shell">
        <section class="mofa-intro">
          <div class="mofa-intro-inner">
            <div class="mofa-kicker">Schweizer Theorie · Kategorie M</div>
            <h3>Prüfungssimulation Töffli</h3>
            <p>30 prüfungsnahe Multiple-Response-Fragen. Bei jeder Aufgabe beurteilst du drei Aussagen einzeln als <strong>Richtig</strong> oder <strong>Falsch</strong>. Bildfragen mit Schweizer Signalen und echten Verkehrsfotos sind integriert.</p>
            <div class="mofa-exam-facts">
              <div class="mofa-fact"><strong>30</strong><span>Fragen</span></div>
              <div class="mofa-fact"><strong>45 min</strong><span>Prüfungszeit</span></div>
              <div class="mofa-fact"><strong>90</strong><span>mögliche Punkte</span></div>
              <div class="mofa-fact"><strong>max. 9</strong><span>Fehlerpunkte</span></div>
            </div>
            <div class="mofa-resume">
              <button class="btn primary" onclick="startMofaExam()">Prüfung starten</button>
              ${best>0?'<span class="mofa-best">Bestes Resultat: '+best+'/90</span>':''}
            </div>
            <p class="mofa-note">Prüfungsnahe Übung auf Basis des offiziellen <a href="https://asa.ch/wp-content/uploads/2022/03/KatKompM.pdf" target="_blank" rel="noopener">asa-Kompetenzkatalogs Kategorie M</a> und der <a href="https://asa.ch/dienstleistungen/theoriepruefung/pruefungsform/" target="_blank" rel="noopener">publizierten Prüfungsform</a>. Keine Originalfragen aus dem geschützten asa-Fragenkatalog. Bildquellen und Lizenzen stehen direkt beim Bild.</p>
          </div>
        </section>
      </div>`;
  }

  function imageHtml(q){
    if(!q.image) return '';
    return `<figure class="mofa-photo ${q.cls||''}">
      <img src="${q.image}" alt="${esc(q.alt||'Bildfrage')}" loading="eager">
      <figcaption class="mofa-credit"><a href="${q.source}" target="_blank" rel="noopener noreferrer">${esc(q.credit||'Wikimedia Commons')}</a></figcaption>
    </figure>`;
  }

  function installImageFallback(host){
    host.querySelectorAll('.mofa-photo img').forEach(function(img){
      img.addEventListener('error',function(){
        if(img.dataset.failed) return;
        img.dataset.failed='1';
        img.style.display='none';
        const box=document.createElement('div');
        box.className='mofa-image-error';
        box.textContent='Bild konnte nicht geladen werden. Bitte Internetverbindung prüfen.';
        img.parentNode.insertBefore(box,img.nextSibling);
      });
    });
  }

  function renderQuestion(host){
    state.index=Math.max(0,Math.min(29,Number(state.index)||0));
    const q=QUESTIONS[state.index];
    const a=state.answers[q.id]||{};
    const answered=answeredCount();
    const pct=Math.round(answered/90*100);
    const statements=q.s.map(function(st,i){
      return `<div class="mofa-statement">
        <div class="mofa-statement-text">${i+1}. ${esc(st[0])}</div>
        <div class="mofa-binary">
          <button class="true ${a[i]===true?'selected':''}" onclick="answerMofa('${q.id}',${i},true)">Richtig</button>
          <button class="false ${a[i]===false?'selected':''}" onclick="answerMofa('${q.id}',${i},false)">Falsch</button>
        </div>
      </div>`;
    }).join('');
    const nav=QUESTIONS.map(function(item,i){
      return `<button class="${i===state.index?'current':(questionComplete(item)?'done':'')}" onclick="mofaGo(${i})">${i+1}</button>`;
    }).join('');
    host.innerHTML=`
      <div class="mofa-exam-layout">
        <section class="card mofa-question-card">
          <div class="mofa-question-head">
            <div><div class="mofa-question-number">Frage ${state.index+1} von 30</div><h3>${esc(q.prompt)}</h3></div>
            <span class="mofa-topic">${esc(q.topic)}</span>
          </div>
          ${imageHtml(q)}
          <div class="mofa-statements">${statements}</div>
          <div class="mofa-question-actions">
            <button class="btn" onclick="mofaGo(${Math.max(0,state.index-1)})" ${state.index===0?'disabled':''}>← Zurück</button>
            <div class="right">
              <button class="btn" onclick="resetMofaExam()">Neu starten</button>
              ${state.index<29?'<button class="btn primary" onclick="mofaGo('+(state.index+1)+')">Weiter →</button>':'<button class="btn primary" onclick="submitMofaExam()">Prüfung abgeben</button>'}
            </div>
          </div>
        </section>
        <aside class="mofa-side">
          <div class="card mofa-side-card">
            <div class="mofa-side-top">
              <div><div class="mofa-side-label">Restzeit</div><div class="mofa-timer" id="mofaTimer">45:00</div></div>
              <div style="text-align:right"><div class="mofa-side-label">Beantwortet</div><strong>${answered}/90</strong></div>
            </div>
            <div class="mofa-progressbar"><span style="width:${pct}%"></span></div>
            <div class="mofa-side-copy">${pct}% der Aussagen beurteilt</div>
          </div>
          <div class="card mofa-side-card">
            <div class="mofa-side-label">Fragenübersicht</div>
            <div class="mofa-nav-grid">${nav}</div>
            <button class="btn primary mofa-submit" onclick="submitMofaExam()">Prüfung abgeben</button>
            <p class="mofa-exam-help">Grün = alle 3 Aussagen beantwortet. Nicht beantwortete Aussagen zählen als Fehler.</p>
          </div>
        </aside>
      </div>`;
    installImageFallback(host);
  }

  function updateTimer(){
    if(!state.started || state.submitted){clearTimer();return;}
    const sec=remainingSeconds();
    const el=document.getElementById('mofaTimer');
    if(el){
      el.textContent=formatTime(sec);
      el.classList.toggle('warning',sec<=600&&sec>180);
      el.classList.toggle('danger',sec<=180);
    }
    if(sec<=0){clearTimer();window.submitMofaExam(true);}
  }

  function renderResult(host){
    const score=scoreExam();
    const errors=90-score;
    const passed=errors<=9;
    const percent=Math.round(score/90*100);
    const wrong=[];
    QUESTIONS.forEach(function(q,qi){
      const a=state.answers[q.id]||{};
      q.s.forEach(function(st,si){
        if(a[si]!==st[1]){
          wrong.push({q:qi+1,text:st[0],expected:st[1]?'Richtig':'Falsch',why:st[2],omitted:typeof a[si]!=='boolean'});
        }
      });
    });
    const review=wrong.length?wrong.map(function(w){
      return `<div class="mofa-review-item">
        <strong>Frage ${w.q} · ${w.omitted?'nicht beantwortet':'falsch beurteilt'}</strong>
        <p>${esc(w.text)}</p>
        <p class="why">Richtige Beurteilung: <strong>${w.expected}</strong> · ${esc(w.why)}</p>
      </div>`;
    }).join(''):'<div class="mofa-review-item" style="border-color:#ccebdd;background:#f5fcf8"><strong>Perfekt</strong><p>Du hast alle 90 Aussagen richtig beurteilt.</p></div>';
    host.innerHTML=`
      <section class="card mofa-result">
        <div class="mofa-result-hero">
          <div class="mofa-result-score" style="--score:${percent}%"><div><strong>${score}/90</strong><span>${percent}%</span></div></div>
          <div>
            <h3>${passed?'Bestanden':'Noch nicht bestanden'}</h3>
            <p>In dieser prüfungsnahen Simulation darfst du höchstens 9 Fehlerpunkte haben. Jede der 90 Aussagen zählt hier als ein Punkt.</p>
            <div class="mofa-result-badges">
              <span class="mofa-result-badge ${passed?'pass':'fail'}">${passed?'✓ bestanden':'✕ nicht bestanden'}</span>
              <span class="mofa-result-badge">${errors} Fehlerpunkte</span>
              <span class="mofa-result-badge">${wrong.length} falsche/offene Aussagen</span>
            </div>
          </div>
        </div>
        <div class="mofa-review"><h4>Auswertung deiner Fehler</h4>${review}</div>
        <div class="mofa-result-actions">
          <button class="btn primary" onclick="startMofaExam()">Neue Prüfung starten</button>
          <button class="btn" data-go="subjects">Zu den Fächern</button>
        </div>
      </section>`;
  }

  function renderTests(){
    const host=ensureHost();
    if(!host) return;
    clearTimer();
    const subject=activeSubject();
    if(!subject){host.innerHTML='';return;}
    if(subject.id!==MOFA_SUBJECT_ID){
      host.innerHTML='<div class="card panel"><div class="empty"><div class="emoji">✓</div><h4>Noch keine Tests in diesem Fach</h4><p>Neue Tests werden automatisch diesem ausgewählten Fach zugeordnet.</p><button class="btn primary">Test erstellen</button></div></div>';
      return;
    }
    if(!state.started){renderIntro(host);return;}
    if(state.submitted){renderResult(host);return;}
    renderQuestion(host);
    updateTimer();
    timerId=setInterval(updateTimer,1000);
  }

  window.startMofaExam=function(){
    clearTimer();
    state={started:true,submitted:false,index:0,answers:{},startedAt:Date.now(),submittedAt:null};
    saveState();
    renderTests();
  };

  window.answerMofa=function(qid,index,value){
    if(state.submitted) return;
    if(!state.answers[qid]) state.answers[qid]={};
    state.answers[qid][index]=value;
    saveState();
    renderTests();
  };

  window.mofaGo=function(index){
    state.index=Math.max(0,Math.min(29,index));
    saveState();
    renderTests();
  };

  window.resetMofaExam=function(){
    if(state.started&&!state.submitted&&!confirm('Laufende Prüfung wirklich neu starten?')) return;
    clearTimer();
    localStorage.removeItem(EXAM_KEY);
    state=defaultState();
    renderTests();
  };

  window.submitMofaExam=function(force){
    if(state.submitted) return;
    const answered=answeredCount();
    if(!force && answered<90 && !confirm('Du hast erst '+answered+' von 90 Aussagen beantwortet. Trotzdem abgeben?')) return;
    state.submitted=true;
    state.submittedAt=Date.now();
    saveState();
    clearTimer();
    const score=scoreExam();
    const best=Number(localStorage.getItem(BEST_KEY)||0);
    if(score>best) localStorage.setItem(BEST_KEY,String(score));
    renderTests();
  };

  const originalSelectSubject=window.selectSubject;
  window.selectSubject=function(id){
    if(id!==MOFA_SUBJECT_ID && typeof originalSelectSubject==='function'){
      originalSelectSubject(id);
      return;
    }
    if(typeof activeSubjectId!=='undefined') activeSubjectId=id;
    localStorage.setItem('lernwelt_active_subject_v1',id);
    if(typeof renderSubjects==='function') renderSubjects();
    if(typeof updateSubjectContext==='function') updateSubjectContext();
    if(typeof navigate==='function') navigate('tests');
    renderTests();
  };

  document.addEventListener('click',function(e){
    const testNav=e.target.closest('[data-page="tests"],[data-go="tests"]');
    if(testNav) setTimeout(renderTests,0);
  });

  seedSubject();
  ensureHost();
  if(activeSubject() && activeSubject().id===MOFA_SUBJECT_ID) renderTests();
})();