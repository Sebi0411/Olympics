import { getOlympicData } from './olympicData.mjs';

const arr = getOlympicData();

function participatingCountries() {
  const arr = getOlympicData();
  return arr.map(item => item.Nation);
}

function getTop5CountriesByPopulation(data) {
  const sortedData = data.sort((a, b) => b.Population - a.Population);
  const top5Countries = sortedData.slice(0, 5);
  return top5Countries.map(item => `${item.Nation} ${item.Population}`);
}

function getExistingCountriesWithA(data) {
  const filteredData = data.filter(item => item.Exists === "YES" && item.Nation.startsWith("A"));
  return filteredData.map(item => item.Nation);
}

function getTotalPopulation(data) {
  return data.reduce((total, country) => total + country.Population, 0);
}

function getTop5CountriesByFirstAppearance(data) {
  const sortedData = data.sort((a, b) => a.First_App - b.First_App);
  const finalData = sortedData.slice(0, 5);
  return finalData.map(item => `${item.Nation} ${item.First_App}`);
}

function getCountriesWithCodes(data) {
  const finalData = data.map(item => ({
    nation: item.Nation,
    code: item.Code
  }))
  return finalData;
}

function getCountryWithMostAppearances(data) {
  let countryWithMostApps = data.reduce((max, country) => {
    return country.Apps > max.Apps ? country : max;
  }, data[0]);

   return `${countryWithMostApps.Nation} ${countryWithMostApps.Apps}`;
}

function getAthleticCountries(data) {
  const athleticData = data.filter(country => country.MostSuccessfulSport === "Athletics");
  return athleticData.map(item => `${item.Nation} ${item.MostSuccessfulSport}`);
}

function getSmallestCountryWithMedal(data) {
  const countriesWithMedals = data.filter(country => country.Medals > 0 && country.Population > 0);

  const smallestCountry = countriesWithMedals.reduce((min, country) => {
    return country.Population < min.Population ? country : min;
  }, countriesWithMedals[0]);

  return `${smallestCountry.Nation} ${smallestCountry.Population} ${smallestCountry.Medals}`;
}

function getCountriesAndPopulations(data) {
  const result = {};
  data.forEach(country => {
    result[country.Nation] = country.Population;
  });

  return result;
}

function groupCountriesByFirstLetter(data) {
  const groupedCountries = {};

  data.forEach(country => {
    const firstLetter = country.Nation.charAt(0).toUpperCase();

    if (!groupedCountries[firstLetter]) {
      groupedCountries[firstLetter] = [];
    }

    groupedCountries[firstLetter].push(country.Nation);
  });

  return groupedCountries;
}

function getRandomCountryAndPopulation(data) {
  if (data.length === 0) {
    return { nation: 'No data available', population: 0 };
  }

  const randomIndex = Math.floor(Math.random() * data.length);

  const selectedCountry = data[randomIndex];

  return {
    nation: selectedCountry.Nation,
    population: selectedCountry.Population
  };
}

function getCountriesWithMoreWinterThanSummerMedals(data) {
  const countriesWithPopulationOver1Million = data.filter(country => country.Population > 1000000);

  const result = countriesWithPopulationOver1Million
  .filter(country => country.WO_Medal > country.SO_Medal)
  .map(country => ({
    nation: country.Nation,
    population: country.Population,
    winterMedals: country.WO_Medal,
    summerMedals: country.SO_Medal
  }));
  return result;
}

function getCountriesWithMoreMedalsThanAverage(data) {
  const totalMedals = data.reduce((acc, country) => {
    return acc + (country.Medal);
  }, 0);
  
  const totalCountries = data.length;

  const averageMedalsPerCountry = totalMedals / totalCountries;

  console.log(averageMedalsPerCountry);

  const countriesWithPopulationUnder5Million = data.filter(country => country.Population < 5000000);

  const result = countriesWithPopulationUnder5Million.filter(country => {
    const totalCountryMedals = country.Medals;
    return totalCountryMedals > (0.5 * averageMedalsPerCountry);
  }).map(country => ({
    nation: country.Nation,
    population: country.Population,
    totalMedals: country.Medals
  }));

  return result;
}

function getCountryWithMostRecentFirstAppearance(data) {
  const mostRecentCountry = data.reduce((latest, country) => {
    return (country.First_App > latest.First_App) ? country : latest;
  });

  return {
    nation: mostRecentCountry.Nation,
    firstAppearance: mostRecentCountry.First_App
  };
}

function getCountriesWithOldestFirstAppearance(data) {
  const existingCountries = data.filter(country => country.Exists === "YES");

  const oldestFirstAppearance = Math.min(...existingCountries.map(country => country.First_App));

  const oldestCountries = existingCountries.filter(country => country.First_App === oldestFirstAppearance);

  return oldestCountries.map(country => ({
    nation: country.Nation,
    firstAppearance: country.First_App
  }));
}

console.log(getCountriesWithCodes(arr));
