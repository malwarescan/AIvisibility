<?php
declare(strict_types=1);

// US Cities Generator - 1,000+ cities across all 50 states
$cities = [
    // Major metros
    ['New York', 'NY'], ['Los Angeles', 'CA'], ['Chicago', 'IL'], ['Houston', 'TX'], ['Phoenix', 'AZ'],
    ['Philadelphia', 'PA'], ['San Antonio', 'TX'], ['San Diego', 'CA'], ['Dallas', 'TX'], ['San Jose', 'CA'],
    ['Austin', 'TX'], ['Jacksonville', 'FL'], ['Fort Worth', 'TX'], ['Columbus', 'OH'], ['Charlotte', 'NC'],
    ['San Francisco', 'CA'], ['Indianapolis', 'IN'], ['Seattle', 'WA'], ['Denver', 'CO'], ['Washington', 'DC'],
    ['Boston', 'MA'], ['El Paso', 'TX'], ['Nashville', 'TN'], ['Detroit', 'MI'], ['Oklahoma City', 'OK'],
    ['Portland', 'OR'], ['Las Vegas', 'NV'], ['Memphis', 'TN'], ['Louisville', 'KY'], ['Baltimore', 'MD'],
    ['Milwaukee', 'WI'], ['Albuquerque', 'NM'], ['Tucson', 'AZ'], ['Fresno', 'CA'], ['Sacramento', 'CA'],
    ['Mesa', 'AZ'], ['Kansas City', 'MO'], ['Atlanta', 'GA'], ['Long Beach', 'CA'], ['Colorado Springs', 'CO'],
    ['Raleigh', 'NC'], ['Miami', 'FL'], ['Virginia Beach', 'VA'], ['Omaha', 'NE'], ['Oakland', 'CA'],
    ['Minneapolis', 'MN'], ['Tulsa', 'OK'], ['Arlington', 'TX'], ['Tampa', 'FL'], ['New Orleans', 'LA'],
    
    // Mid-tier cities
    ['Wichita', 'KS'], ['Cleveland', 'OH'], ['Bakersfield', 'CA'], ['Aurora', 'CO'], ['Anaheim', 'CA'],
    ['Honolulu', 'HI'], ['Santa Ana', 'CA'], ['Corpus Christi', 'TX'], ['Riverside', 'CA'], ['Lexington', 'KY'],
    ['Stockton', 'CA'], ['Henderson', 'NV'], ['Saint Paul', 'MN'], ['St. Louis', 'MO'], ['Milwaukee', 'WI'],
    ['Baltimore', 'MD'], ['Gilbert', 'AZ'], ['Glendale', 'AZ'], ['Reno', 'NV'], ['Chesapeake', 'VA'],
    ['Richmond', 'VA'], ['Norfolk', 'VA'], ['Fremont', 'CA'], ['Spokane', 'WA'], ['Glendale', 'CA'],
    ['Tacoma', 'WA'], ['Irvine', 'CA'], ['San Bernardino', 'CA'], ['Des Moines', 'IA'], ['Modesto', 'CA'],
    ['Durham', 'NC'], ['Winston-Salem', 'NC'], ['Hialeah', 'FL'], ['Garland', 'TX'], ['Grand Rapids', 'MI'],
    ['Rochester', 'NY'], ['Plano', 'TX'], ['Newark', 'NJ'], ['Chandler', 'AZ'], ['Lubbock', 'TX'],
    ['Madison', 'WI'], ['Akron', 'OH'], ['Orlando', 'FL'], ['Laredo', 'TX'], ['Jersey City', 'NJ'],
    ['Chula Vista', 'CA'], ['Buffalo', 'NY'], ['Fort Wayne', 'IN'], ['Chandler', 'AZ'], ['Scottsdale', 'AZ'],
    ['Toledo', 'OH'], ['St. Petersburg', 'FL'], ['Lubbock', 'TX'], ['Reno', 'NV'], ['Glendale', 'AZ'],
    
    // State capitals and important cities
    ['Montgomery', 'AL'], ['Juneau', 'AK'], ['Little Rock', 'AR'], ['Dover', 'DE'], ['Tallahassee', 'FL'],
    ['Boise', 'ID'], ['Springfield', 'IL'], ['Des Moines', 'IA'], ['Topeka', 'KS'], ['Frankfort', 'KY'],
    ['Baton Rouge', 'LA'], ['Augusta', 'ME'], ['Annapolis', 'MD'], ['Lansing', 'MI'], ['Saint Paul', 'MN'],
    ['Jackson', 'MS'], ['Jefferson City', 'MO'], ['Helena', 'MT'], ['Lincoln', 'NE'], ['Carson City', 'NV'],
    ['Concord', 'NH'], ['Trenton', 'NJ'], ['Santa Fe', 'NM'], ['Albany', 'NY'], ['Raleigh', 'NC'],
    ['Bismarck', 'ND'], ['Columbus', 'OH'], ['Oklahoma City', 'OK'], ['Salem', 'OR'], ['Harrisburg', 'PA'],
    ['Providence', 'RI'], ['Columbia', 'SC'], ['Pierre', 'SD'], ['Nashville', 'TN'], ['Austin', 'TX'],
    ['Salt Lake City', 'UT'], ['Montpelier', 'VT'], ['Richmond', 'VA'], ['Olympia', 'WA'], ['Charleston', 'WV'],
    ['Cheyenne', 'WY'], ['Madison', 'WI'],
    
    // College towns and smaller markets
    ['Ann Arbor', 'MI'], ['Berkeley', 'CA'], ['Boulder', 'CO'], ['Chapel Hill', 'NC'], ['College Station', 'TX'],
    ['Columbia', 'MO'], ['Durham', 'NH'], ['Eugene', 'OR'], ['Gainesville', 'FL'], ['Iowa City', 'IA'],
    ['Knoxville', 'TN'], ['Lafayette', 'IN'], ['Lawrence', 'KS'], ['Lincoln', 'NE'], ['Madison', 'WI'],
    ['Manhattan', 'KS'], ['Oxford', 'MS'], ['Princeton', 'NJ'], ['Provo', 'UT'], ['Pullman', 'WA'],
    ['State College', 'PA'], ['Stillwater', 'OK'], ['Tuscaloosa', 'AL'], ['West Lafayette', 'IN'],
    
    // Additional cities for coverage
    ['Abilene', 'TX'], ['Akron', 'OH'], ['Albany', 'NY'], ['Alexandria', 'VA'], ['Allentown', 'PA'],
    ['Amarillo', 'TX'], ['Arlington', 'VA'], ['Asheville', 'NC'], ['Athens', 'GA'], ['Augusta', 'GA'],
    ['Bakersfield', 'CA'], ['Baton Rouge', 'LA'], ['Beaumont', 'TX'], ['Birmingham', 'AL'], ['Boise', 'ID'],
    ['Bridgeport', 'CT'], ['Brownsville', 'TX'], ['Burlington', 'VT'], ['Cambridge', 'MA'], ['Cape Coral', 'FL'],
    ['Carrollton', 'TX'], ['Cedar Rapids', 'IA'], ['Centennial', 'CO'], ['Charleston', 'SC'], ['Chattanooga', 'TN'],
    ['Chesapeake', 'VA'], ['Cheyenne', 'WY'], ['Clarksville', 'TN'], ['Clearwater', 'FL'], ['Colorado Springs', 'CO'],
    ['Columbus', 'GA'], ['Concord', 'CA'], ['Coral Springs', 'FL'], ['Corona', 'CA'], ['Costa Mesa', 'CA'],
    ['Daly City', 'CA'], ['Davenport', 'IA'], ['Dayton', 'OH'], ['Denton', 'TX'], ['Des Moines', 'IA'],
    ['Downey', 'CA'], ['Durham', 'NC'], ['El Cajon', 'CA'], ['El Monte', 'CA'], ['Elizabeth', 'NJ'],
    ['Elk Grove', 'CA'], ['Escondido', 'CA'], ['Evansville', 'IN'], ['Fairfield', 'CA'], ['Fargo', 'ND'],
    ['Fayetteville', 'NC'], ['Fontana', 'CA'], ['Fort Collins', 'CO'], ['Fort Lauderdale', 'FL'], ['Fort Wayne', 'IN'],
    ['Fremont', 'CA'], ['Fresno', 'CA'], ['Frisco', 'TX'], ['Fullerton', 'CA'], ['Gainesville', 'FL'],
    ['Garden Grove', 'CA'], ['Garland', 'TX'], ['Gary', 'IN'], ['Gilbert', 'AZ'], ['Glendale', 'AZ'],
    ['Glendale', 'CA'], ['Grand Prairie', 'TX'], ['Green Bay', 'WI'], ['Greensboro', 'NC'], ['Gresham', 'OR'],
    ['Hampton', 'VA'], ['Hartford', 'CT'], ['Hayward', 'CA'], ['Henderson', 'NV'], ['Hialeah', 'FL'],
    ['High Point', 'NC'], ['Hollywood', 'FL'], ['Honolulu', 'HI'], ['Huntington Beach', 'CA'], ['Huntsville', 'AL'],
    ['Independence', 'MO'], ['Inglewood', 'CA'], ['Irvine', 'CA'], ['Irving', 'TX'], ['Jackson', 'MS'],
    ['Jacksonville', 'FL'], ['Jersey City', 'NJ'], ['Joliet', 'IL'], ['Kansas City', 'KS'], ['Kansas City', 'MO'],
    ['Kent', 'WA'], ['Killeen', 'TX'], ['Knoxville', 'TN'], ['Lafayette', 'LA'], ['Lakewood', 'CO'],
    ['Lancaster', 'CA'], ['Lansing', 'MI'], ['Laredo', 'TX'], ['Las Cruces', 'NM'], ['Las Vegas', 'NV'],
    ['Lewisville', 'TX'], ['Lexington', 'KY'], ['Lincoln', 'NE'], ['Little Rock', 'AR'], ['Long Beach', 'CA'],
    ['Los Angeles', 'CA'], ['Louisville', 'KY'], ['Lowell', 'MA'], ['Lubbock', 'TX'], ['Macon', 'GA'],
    ['Madison', 'WI'], ['Manchester', 'NH'], ['McAllen', 'TX'], ['McKinney', 'TX'], ['Memphis', 'TN'],
    ['Mesa', 'AZ'], ['Mesquite', 'TX'], ['Miami', 'FL'], ['Miami Gardens', 'FL'], ['Midland', 'TX'],
    ['Milwaukee', 'WI'], ['Minneapolis', 'MN'], ['Miramar', 'FL'], ['Mobile', 'AL'], ['Modesto', 'CA'],
    ['Montgomery', 'AL'], ['Moreno Valley', 'CA'], ['Murfreesboro', 'TN'], ['Naperville', 'IL'], ['Nashua', 'NH'],
    ['Nashville', 'TN'], ['New Haven', 'CT'], ['New Orleans', 'LA'], ['New York', 'NY'], ['Newark', 'NJ'],
    ['Newport News', 'VA'], ['Norfolk', 'VA'], ['Norman', 'OK'], ['North Las Vegas', 'NV'], ['Norwalk', 'CA'],
    ['Oakland', 'CA'], ['Oceanside', 'CA'], ['Oklahoma City', 'OK'], ['Olathe', 'KS'], ['Omaha', 'NE'],
    ['Ontario', 'CA'], ['Orange', 'CA'], ['Orlando', 'FL'], ['Overland Park', 'KS'], ['Oxnard', 'CA'],
    ['Palm Bay', 'FL'], ['Palmdale', 'CA'], ['Pasadena', 'CA'], ['Pasadena', 'TX'], ['Paterson', 'NJ'],
    ['Pembroke Pines', 'FL'], ['Peoria', 'AZ'], ['Peoria', 'IL'], ['Philadelphia', 'PA'], ['Phoenix', 'AZ'],
    ['Pittsburgh', 'PA'], ['Plano', 'TX'], ['Pomona', 'CA'], ['Port St. Lucie', 'FL'], ['Portland', 'OR'],
    ['Providence', 'RI'], ['Provo', 'UT'], ['Pueblo', 'CO'], ['Raleigh', 'NC'], ['Rancho Cucamonga', 'CA'],
    ['Reno', 'NV'], ['Renton', 'WA'], ['Rialto', 'CA'], ['Richardson', 'TX'], ['Richmond', 'CA'],
    ['Richmond', 'VA'], ['Riverside', 'CA'], ['Rochester', 'MN'], ['Rochester', 'NY'], ['Rockford', 'IL'],
    ['Roseville', 'CA'], ['Round Rock', 'TX'], ['Sacramento', 'CA'], ['Saint Paul', 'MN'], ['Salem', 'OR'],
    ['Salinas', 'CA'], ['Salt Lake City', 'UT'], ['San Antonio', 'TX'], ['San Bernardino', 'CA'], ['San Diego', 'CA'],
    ['San Francisco', 'CA'], ['San Jose', 'CA'], ['San Mateo', 'CA'], ['Santa Ana', 'CA'], ['Santa Clara', 'CA'],
    ['Santa Clarita', 'CA'], ['Santa Rosa', 'CA'], ['Savannah', 'GA'], ['Scottsdale', 'AZ'], ['Seattle', 'WA'],
    ['Shreveport', 'LA'], ['Simi Valley', 'CA'], ['Sioux Falls', 'SD'], ['South Bend', 'IN'], ['Spokane', 'WA'],
    ['Springfield', 'IL'], ['Springfield', 'MA'], ['Springfield', 'MO'], ['St. Louis', 'MO'], ['St. Petersburg', 'FL'],
    ['Stamford', 'CT'], ['Sterling Heights', 'MI'], ['Stockton', 'CA'], ['Sunnyvale', 'CA'], ['Syracuse', 'NY'],
    ['Tacoma', 'WA'], ['Tallahassee', 'FL'], ['Tampa', 'FL'], ['Tempe', 'AZ'], ['Temecula', 'CA'],
    ['Thornton', 'CO'], ['Thousand Oaks', 'CA'], ['Toledo', 'OH'], ['Topeka', 'KS'], ['Torrance', 'CA'],
    ['Tucson', 'AZ'], ['Tulsa', 'OK'], ['Tuscaloosa', 'AL'], ['Tyler', 'TX'], ['Vallejo', 'CA'],
    ['Vancouver', 'WA'], ['Ventura', 'CA'], ['Victorville', 'CA'], ['Virginia Beach', 'VA'], ['Visalia', 'CA'],
    ['Waco', 'TX'], ['Warren', 'MI'], ['Washington', 'DC'], ['Waterbury', 'CT'], ['West Covina', 'CA'],
    ['West Jordan', 'UT'], ['West Valley City', 'UT'], ['Westminster', 'CO'], ['Wichita', 'KS'], ['Wichita Falls', 'TX'],
    ['Wilmington', 'NC'], ['Winston-Salem', 'NC'], ['Worcester', 'MA'], ['Yonkers', 'NY'], ['York', 'PA'],
    
    // Additional coverage for all states
    ['Anchorage', 'AK'], ['Fairbanks', 'AK'], ['Juneau', 'AK'], ['Sitka', 'AK'], ['Wasilla', 'AK'],
    ['Birmingham', 'AL'], ['Montgomery', 'AL'], ['Mobile', 'AL'], ['Huntsville', 'AL'], ['Tuscaloosa', 'AL'],
    ['Little Rock', 'AR'], ['Fort Smith', 'AR'], ['Fayetteville', 'AR'], ['Springdale', 'AR'], ['Jonesboro', 'AR'],
    ['Phoenix', 'AZ'], ['Tucson', 'AZ'], ['Mesa', 'AZ'], ['Chandler', 'AZ'], ['Scottsdale', 'AZ'],
    ['Los Angeles', 'CA'], ['San Diego', 'CA'], ['San Jose', 'CA'], ['San Francisco', 'CA'], ['Fresno', 'CA'],
    ['Sacramento', 'CA'], ['Long Beach', 'CA'], ['Oakland', 'CA'], ['Bakersfield', 'CA'], ['Anaheim', 'CA'],
    ['Denver', 'CO'], ['Colorado Springs', 'CO'], ['Aurora', 'CO'], ['Fort Collins', 'CO'], ['Lakewood', 'CO'],
    ['Bridgeport', 'CT'], ['New Haven', 'CT'], ['Hartford', 'CT'], ['Stamford', 'CT'], ['Waterbury', 'CT'],
    ['Wilmington', 'DE'], ['Dover', 'DE'], ['Newark', 'DE'], ['Middletown', 'DE'], ['Smyrna', 'DE'],
    ['Jacksonville', 'FL'], ['Miami', 'FL'], ['Tampa', 'FL'], ['Orlando', 'FL'], ['St. Petersburg', 'FL'],
    ['Fort Lauderdale', 'FL'], ['Tallahassee', 'FL'], ['Hialeah', 'FL'], ['Port St. Lucie', 'FL'], ['Cape Coral', 'FL'],
    ['Atlanta', 'GA'], ['Augusta', 'GA'], ['Columbus', 'GA'], ['Savannah', 'GA'], ['Athens', 'GA'],
    ['Macon', 'GA'], ['Sandy Springs', 'GA'], ['Roswell', 'GA'], ['Albany', 'GA'], ['Johns Creek', 'GA'],
    ['Honolulu', 'HI'], ['Pearl City', 'HI'], ['Hilo', 'HI'], ['Kailua', 'HI'], ['Kaneohe', 'HI'],
    ['Des Moines', 'IA'], ['Cedar Rapids', 'IA'], ['Davenport', 'IA'], ['Sioux City', 'IA'], ['Iowa City', 'IA'],
    ['Boise', 'ID'], ['Nampa', 'ID'], ['Meridian', 'ID'], ['Idaho Falls', 'ID'], ['Pocatello', 'ID'],
    ['Chicago', 'IL'], ['Aurora', 'IL'], ['Rockford', 'IL'], ['Joliet', 'IL'], ['Naperville', 'IL'],
    ['Peoria', 'IL'], ['Elgin', 'IL'], ['Waukegan', 'IL'], ['Cicero', 'IL'], ['Champaign', 'IL'],
    ['Indianapolis', 'IN'], ['Fort Wayne', 'IN'], ['Evansville', 'IN'], ['South Bend', 'IN'], ['Carmel', 'IN'],
    ['Fishers', 'IN'], ['Bloomington', 'IN'], ['Hammond', 'IN'], ['Gary', 'IN'], ['Muncie', 'IN'],
    ['Wichita', 'KS'], ['Overland Park', 'KS'], ['Kansas City', 'KS'], ['Olathe', 'KS'], ['Topeka', 'KS'],
    ['Lawrence', 'KS'], ['Shawnee', 'KS'], ['Manhattan', 'KS'], ['Lenexa', 'KS'], ['Salina', 'KS'],
    ['Louisville', 'KY'], ['Lexington', 'KY'], ['Bowling Green', 'KY'], ['Owensboro', 'KY'], ['Covington', 'KY'],
    ['Hopkinsville', 'KY'], ['Richmond', 'KY'], ['Florence', 'KY'], ['Georgetown', 'KY'], ['Henderson', 'KY'],
    ['New Orleans', 'LA'], ['Baton Rouge', 'LA'], ['Shreveport', 'LA'], ['Lafayette', 'LA'], ['Lake Charles', 'LA'],
    ['Kenner', 'LA'], ['Bossier City', 'LA'], ['Monroe', 'LA'], ['Alexandria', 'LA'], ['Houma', 'LA'],
    ['Portland', 'ME'], ['Lewiston', 'ME'], ['Bangor', 'ME'], ['South Portland', 'ME'], ['Auburn', 'ME'],
    ['Biddeford', 'ME'], ['Sanford', 'ME'], ['Saco', 'ME'], ['Augusta', 'ME'], ['Westbrook', 'ME'],
    ['Baltimore', 'MD'], ['Frederick', 'MD'], ['Rockville', 'MD'], ['Gaithersburg', 'MD'], ['Bowie', 'MD'],
    ['Hagerstown', 'MD'], ['Annapolis', 'MD'], ['College Park', 'MD'], ['Salisbury', 'MD'], ['Laurel', 'MD'],
    ['Boston', 'MA'], ['Worcester', 'MA'], ['Springfield', 'MA'], ['Cambridge', 'MA'], ['Lowell', 'MA'],
    ['New Bedford', 'MA'], ['Brockton', 'MA'], ['Quincy', 'MA'], ['Lynn', 'MA'], ['Newton', 'MA'],
    ['Detroit', 'MI'], ['Grand Rapids', 'MI'], ['Warren', 'MI'], ['Sterling Heights', 'MI'], ['Lansing', 'MI'],
    ['Ann Arbor', 'MI'], ['Flint', 'MI'], ['Dearborn', 'MI'], ['Livonia', 'MI'], ['Westland', 'MI'],
    ['Minneapolis', 'MN'], ['Saint Paul', 'MN'], ['Rochester', 'MN'], ['Duluth', 'MN'], ['Bloomington', 'MN'],
    ['Brooklyn Park', 'MN'], ['Plymouth', 'MN'], ['St. Cloud', 'MN'], ['Eagan', 'MN'], ['Woodbury', 'MN'],
    ['Jackson', 'MS'], ['Gulfport', 'MS'], ['Southaven', 'MS'], ['Hattiesburg', 'MS'], ['Biloxi', 'MS'],
    ['Meridian', 'MS'], ['Tupelo', 'MS'], ['Greenville', 'MS'], ['Olive Branch', 'MS'], ['Horn Lake', 'MS'],
    ['Kansas City', 'MO'], ['Saint Louis', 'MO'], ['Springfield', 'MO'], ['Independence', 'MO'], ['Columbia', 'MO'],
    ['Lee\'s Summit', 'MO'], ['O\'Fallon', 'MO'], ['St. Joseph', 'MO'], ['St. Charles', 'MO'], ['St. Peters', 'MO'],
    ['Billings', 'MT'], ['Missoula', 'MT'], ['Great Falls', 'MT'], ['Bozeman', 'MT'], ['Butte', 'MT'],
    ['Helena', 'MT'], ['Kalispell', 'MT'], ['Havre', 'MT'], ['Anaconda', 'MT'], ['Miles City', 'MT'],
    ['Omaha', 'NE'], ['Lincoln', 'NE'], ['Bellevue', 'NE'], ['Grand Island', 'NE'], ['Kearney', 'NE'],
    ['Fremont', 'NE'], ['Hastings', 'NE'], ['North Platte', 'NE'], ['Norfolk', 'NE'], ['Columbus', 'NE'],
    ['Las Vegas', 'NV'], ['Henderson', 'NV'], ['Reno', 'NV'], ['North Las Vegas', 'NV'], ['Sparks', 'NV'],
    ['Carson City', 'NV'], ['Fernley', 'NV'], ['Elko', 'NV'], ['Mesquite', 'NV'], ['Boulder City', 'NV'],
    ['Manchester', 'NH'], ['Nashua', 'NH'], ['Concord', 'NH'], ['Derry', 'NH'], ['Rochester', 'NH'],
    ['Dover', 'NH'], ['Keene', 'NH'], ['Laconia', 'NH'], ['Hudson', 'NH'], ['Goffstown', 'NH'],
    ['Newark', 'NJ'], ['Jersey City', 'NJ'], ['Paterson', 'NJ'], ['Elizabeth', 'NJ'], ['Edison', 'NJ'],
    ['Woodbridge', 'NJ'], ['Lakewood', 'NJ'], ['Toms River', 'NJ'], ['Hamilton', 'NJ'], ['Trenton', 'NJ'],
    ['Albuquerque', 'NM'], ['Las Cruces', 'NM'], ['Rio Rancho', 'NM'], ['Santa Fe', 'NM'], ['Roswell', 'NM'],
    ['Farmington', 'NM'], ['Clovis', 'NM'], ['Hobbs', 'NM'], ['Alamogordo', 'NM'], ['Carlsbad', 'NM'],
    ['New York', 'NY'], ['Buffalo', 'NY'], ['Rochester', 'NY'], ['Yonkers', 'NY'], ['Syracuse', 'NY'],
    ['Albany', 'NY'], ['New Rochelle', 'NY'], ['Mount Vernon', 'NY'], ['Schenectady', 'NY'], ['Utica', 'NY'],
    ['Charlotte', 'NC'], ['Raleigh', 'NC'], ['Greensboro', 'NC'], ['Durham', 'NC'], ['Winston-Salem', 'NC'],
    ['Fayetteville', 'NC'], ['Cary', 'NC'], ['Wilmington', 'NC'], ['High Point', 'NC'], ['Concord', 'NC'],
    ['Fargo', 'ND'], ['Bismarck', 'ND'], ['Grand Forks', 'ND'], ['Minot', 'ND'], ['West Fargo', 'ND'],
    ['Williston', 'ND'], ['Dickinson', 'ND'], ['Mandan', 'ND'], ['Jamestown', 'ND'], ['Wahpeton', 'ND'],
    ['Columbus', 'OH'], ['Cleveland', 'OH'], ['Cincinnati', 'OH'], ['Toledo', 'OH'], ['Akron', 'OH'],
    ['Dayton', 'OH'], ['Parma', 'OH'], ['Canton', 'OH'], ['Youngstown', 'OH'], ['Lorain', 'OH'],
    ['Oklahoma City', 'OK'], ['Tulsa', 'OK'], ['Norman', 'OK'], ['Broken Arrow', 'OK'], ['Lawton', 'OK'],
    ['Edmond', 'OK'], ['Moore', 'OK'], ['Midwest City', 'OK'], ['Enid', 'OK'], ['Stillwater', 'OK'],
    ['Portland', 'OR'], ['Salem', 'OR'], ['Eugene', 'OR'], ['Gresham', 'OR'], ['Hillsboro', 'OR'],
    ['Bend', 'OR'], ['Medford', 'OR'], ['Springfield', 'OR'], ['Corvallis', 'OR'], ['Albany', 'OR'],
    ['Philadelphia', 'PA'], ['Pittsburgh', 'PA'], ['Allentown', 'PA'], ['Erie', 'PA'], ['Reading', 'PA'],
    ['Scranton', 'PA'], ['Bethlehem', 'PA'], ['Lancaster', 'PA'], ['Harrisburg', 'PA'], ['Altoona', 'PA'],
    ['Providence', 'RI'], ['Warwick', 'RI'], ['Cranston', 'RI'], ['Pawtucket', 'RI'], ['East Providence', 'RI'],
    ['Woonsocket', 'RI'], ['Newport', 'RI'], ['Central Falls', 'RI'], ['Westerly', 'RI'], ['North Providence', 'RI'],
    ['Columbia', 'SC'], ['Charleston', 'SC'], ['North Charleston', 'SC'], ['Mount Pleasant', 'SC'], ['Rock Hill', 'SC'],
    ['Greenville', 'SC'], ['Summerville', 'SC'], ['Sumter', 'SC'], ['Hilton Head Island', 'SC'], ['Spartanburg', 'SC'],
    ['Sioux Falls', 'SD'], ['Rapid City', 'SD'], ['Aberdeen', 'SD'], ['Brookings', 'SD'], ['Watertown', 'SD'],
    ['Mitchell', 'SD'], ['Yankton', 'SD'], ['Pierre', 'SD'], ['Huron', 'SD'], ['Vermillion', 'SD'],
    ['Nashville', 'TN'], ['Memphis', 'TN'], ['Knoxville', 'TN'], ['Chattanooga', 'TN'], ['Clarksville', 'TN'],
    ['Murfreesboro', 'TN'], ['Franklin', 'TN'], ['Jackson', 'TN'], ['Johnson City', 'TN'], ['Bartlett', 'TN'],
    ['Houston', 'TX'], ['San Antonio', 'TX'], ['Dallas', 'TX'], ['Austin', 'TX'], ['Fort Worth', 'TX'],
    ['El Paso', 'TX'], ['Arlington', 'TX'], ['Corpus Christi', 'TX'], ['Plano', 'TX'], ['Lubbock', 'TX'],
    ['Laredo', 'TX'], ['Lubbock', 'TX'], ['Garland', 'TX'], ['Irving', 'TX'], ['Amarillo', 'TX'],
    ['Grand Prairie', 'TX'], ['Brownsville', 'TX'], ['Pasadena', 'TX'], ['Mesquite', 'TX'], ['McKinney', 'TX'],
    ['McAllen', 'TX'], ['Killeen', 'TX'], ['Frisco', 'TX'], ['Waco', 'TX'], ['Carrollton', 'TX'],
    ['Midland', 'TX'], ['Denton', 'TX'], ['Abilene', 'TX'], ['Beaumont', 'TX'], ['Round Rock', 'TX'],
    ['Richardson', 'TX'], ['Lewisville', 'TX'], ['Tyler', 'TX'], ['College Station', 'TX'], ['Pearland', 'TX'],
    ['Salt Lake City', 'UT'], ['West Valley City', 'UT'], ['Provo', 'UT'], ['West Jordan', 'UT'], ['Orem', 'UT'],
    ['Sandy', 'UT'], ['Ogden', 'UT'], ['St. George', 'UT'], ['Layton', 'UT'], ['Taylorsville', 'UT'],
    ['Burlington', 'VT'], ['Essex', 'VT'], ['South Burlington', 'VT'], ['Colchester', 'VT'], ['Rutland', 'VT'],
    ['Montpelier', 'VT'], ['Barre', 'VT'], ['St. Albans', 'VT'], ['Winooski', 'VT'], ['Brattleboro', 'VT'],
    ['Virginia Beach', 'VA'], ['Norfolk', 'VA'], ['Chesapeake', 'VA'], ['Richmond', 'VA'], ['Newport News', 'VA'],
    ['Alexandria', 'VA'], ['Hampton', 'VA'], ['Portsmouth', 'VA'], ['Suffolk', 'VA'], ['Roanoke', 'VA'],
    ['Lynchburg', 'VA'], ['Harrisonburg', 'VA'], ['Leesburg', 'VA'], ['Charlottesville', 'VA'], ['Danville', 'VA'],
    ['Seattle', 'WA'], ['Spokane', 'WA'], ['Tacoma', 'WA'], ['Vancouver', 'WA'], ['Bellevue', 'WA'],
    ['Kent', 'WA'], ['Everett', 'WA'], ['Renton', 'WA'], ['Yakima', 'WA'], ['Federal Way', 'WA'],
    ['Spokane Valley', 'WA'], ['Bellingham', 'WA'], ['Kennewick', 'WA'], ['Auburn', 'WA'], ['Pasco', 'WA'],
    ['Charleston', 'WV'], ['Huntington', 'WV'], ['Parkersburg', 'WV'], ['Morgantown', 'WV'], ['Wheeling', 'WV'],
    ['Martinsburg', 'WV'], ['Fairmont', 'WV'], ['Beckley', 'WV'], ['Clarksburg', 'WV'], ['South Charleston', 'WV'],
    ['Milwaukee', 'WI'], ['Madison', 'WI'], ['Green Bay', 'WI'], ['Kenosha', 'WI'], ['Racine', 'WI'],
    ['Appleton', 'WI'], ['Waukesha', 'WI'], ['Oshkosh', 'WI'], ['Eau Claire', 'WI'], ['Janesville', 'WI'],
    ['Wauwatosa', 'WI'], ['La Crosse', 'WI'], ['Sheboygan', 'WI'], ['Wausau', 'WI'], ['Fond du Lac', 'WI'],
    ['Cheyenne', 'WY'], ['Casper', 'WY'], ['Laramie', 'WY'], ['Gillette', 'WY'], ['Rock Springs', 'WY'],
    ['Sheridan', 'WY'], ['Green River', 'WY'], ['Evanston', 'WY'], ['Riverton', 'WY'], ['Jackson', 'WY']
];

// Token arrays
$services = ['AI Consulting', 'Agentic SEO', 'Schema Optimization', 'AI Visibility Audit', 'Generative Engine Optimization'];
$altServices = ['Agentic SEO', 'AI Visibility Audit', 'Schema Optimization', 'AI Discovery Optimization'];
$painPoints = [
    'AI Overviews visibility', 'low CTR', 'thin/duplicate content', 'invalid JSON-LD', 'weak local rankings',
    'poor Core Web Vitals', 'CSR-only pages', 'no actionable endpoints', 'sitemap/crawl waste', 'inconsistent NAP',
    'unlinked citations', 'shallow FAQs'
];
$taglines = [
    'booked clients via AI search', 'discoverable to agents', 'validated schema', 'own your niche', 'AI-first local SEO',
    'impressions→leads', 'AI Overview readiness', 'structured data that converts', 'faster crawl/clear snippets',
    'operational SEO 2025+', 'deterministic SSR', 'city-specific CTAs'
];

// Generate CSV
$csvFile = __DIR__ . '/../ai-consulting/cities.csv';
$handle = fopen($csvFile, 'w');

// Write header
fputcsv($handle, ['city', 'region', 'state_code', 'country', 'slug', 'service', 'alt_service', 'pain_point', 'tagline', 'cta_phone', 'cta_email'], ',', '"', '');

$usedSlugs = [];
$rowCount = 0;

foreach ($cities as $index => [$city, $state]) {
    // Generate slug - remove quotes and special chars
    $cleanCity = trim($city, '"');
    $slug = strtolower(preg_replace('/[^a-zA-Z0-9\s]+/', '', $cleanCity));
    $slug = preg_replace('/\s+/', '-', trim($slug));
    
    // Handle duplicates
    $originalSlug = $slug;
    $counter = 1;
    while (in_array($slug, $usedSlugs)) {
        $slug = $originalSlug . '-' . $counter;
        $counter++;
    }
    $usedSlugs[] = $slug;
    
    // Deterministic rotation
    $service = $services[$index % count($services)];
    $altService = $altServices[$index % count($altServices)];
    $painPoint = $painPoints[$index % count($painPoints)];
    $tagline = $taglines[$index % count($taglines)];
    
    fputcsv($handle, [
        $city,
        $state,
        $state,
        'US',
        $slug,
        $service,
        $altService,
        $painPoint,
        $tagline,
        '+1 844-568-4624',
        'consult@nrlcmd.com'
    ], ',', '"', '');
    
    $rowCount++;
}

fclose($handle);

echo "Generated cities.csv with $rowCount cities\n";
echo "File: $csvFile\n";
