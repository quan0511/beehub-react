const politicalTerms = [
    "Democracy", "Republic", "Monarchy", "Communism", "Socialism", "Capitalism",
    "Fascism", "Liberalism", "Conservatism", "Nationalism", "Imperialism",
    "Colonialism", "Dictatorship", "Totalitarianism", "Federalism", "Anarchy",
    "Bureaucracy", "Parliament", "Congress", "Senate", "House of Representatives",
    "Prime Minister", "President", "Chancellor", "Governor", "Mayor", "Legislature",
    "Executive", "Judiciary", "Supreme Court", "Constitution", "Bill of Rights",
    "Amendment", "Suffrage", "Electoral College", "Political Party", "Opposition Party",
    "Coalition", "Cabinet", "Diplomacy", "Embargo", "Sanctions", "Sovereignty", 
    "Autonomy", "Patriotism", "Revolution", "Insurrection", "Coup d'état", "Martial Law",
    "Propaganda"
  ];
  
  const curseWords = [
    "Idiot", "Moron", "Imbecile", "Jerk", "Bastard", "Asshole", "Dickhead", "Prick",
    "Dumbass", "Dipshit", "Jackass", "Shithead", "Douchebag", "Cunt", "Fuck", "Fucking",
    "Shit", "Bitch", "Crap", "Damn", "Hell", "Ass", "Wanker", "Twat", "Wimp", "Loser",
    "Psycho", "Scumbag", "Pig", "Slut", "Whore", "Skank", "Scumbag", "Bastard", "Fucker",
    "Motherfucker", "Piss off", "Screw you", "Son of a bitch", "Damn it", "Bullshit",
    "Piss", "Crap", "Douche", "Asshat", "Balls", "Bozo", "Slimeball", "Dork", "Nutjob",
    "Go to hell", "Eat shit", "Fuck off", "Goddamn", "Jesus Christ", "Holy shit",
    "Bloody hell", "Sodding", "Tosser", "Sod off", "Bugger", "Pissed", "Numbnuts",
    "Bonehead", "Dipstick", "Lamebrain", "Peabrain", "Stupid", "Fool", "Clown", "Buffoon",
    "Nincompoop", "Ignoramus", "Chump", "Doofus", "Dunce", "Blockhead", "Dimwit", "Nitwit",
    "Numskull", "Simpleton", "Thickhead", "Airhead", "Knucklehead", "Dumbbell", "Dimbulb",
    "Halfwit", "Birdbrain", "Meathead", "Pinhead", "Bonehead", "Numbskull", "Simpleton",
    "Twit", "Fart", "Windbag", "Blabbermouth", "Lowlife", "Degenerate", "Dirtbag"
  ];
  
  // Kết hợp hai mảng
  const combinedTerms = [...politicalTerms, ...curseWords];
  
  // Lọc các từ trùng lặp
  const uniqueTerms = [...new Set(combinedTerms)];
  export { uniqueTerms };
