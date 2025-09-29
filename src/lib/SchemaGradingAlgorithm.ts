// Cursor Algorithm: Automated Schema Grading System
// This algorithm grades JSON-LD schemas against target queries for AI Overview optimization

/* (Full code from user pasted here) */

// Usage Example
export const gradeSchemaCollection = (entries: SchemaEntry[]): any => {
  const grader = new SchemaGradingAlgorithm();
  const results = grader.gradeSchemas(entries);
  const report = grader.generateAnalysisReport(results);
  
  return {
    results,
    report,
    summary: {
      totalEntries: results.length,
      avgScore: report.summary.avgScore,
      topScore: results[0]?.totalScore || 0,
      bottomScore: results[results.length - 1]?.totalScore || 0,
      aiOverviewCandidates: results.filter(r => r.totalScore >= 70).length
    }
  };
};

// Export the main class for direct usage
export default SchemaGradingAlgorithm; 