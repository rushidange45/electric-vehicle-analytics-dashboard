import Papa from 'papaparse';

export const fetchEVData = async () => {
  const response = await fetch(
    'https://raw.githubusercontent.com/vedant-patil-mapup/analytics-dashboard-assessment/refs/heads/main/data-to-visualize/Electric_Vehicle_Population_Data.csv'
  );
  const csvData = await response.text();

  return new Promise((resolve) => {
    Papa.parse(csvData, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        resolve(results.data);
      },
    });
  });
};
