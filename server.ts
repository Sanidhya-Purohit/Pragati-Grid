import express from 'express';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  analyzeCitizenProblem,
  generateIdeationBlueprint,
  evaluateStudentSolution,
  analyzeCodeBatch,
  autofillProblemFromDescription,
} from './src/services/geminiService.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json({ limit: '20mb' }));

// Health check
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    app: 'Pragati Grid',
    hasGeminiKey: Boolean(process.env.GEMINI_API_KEY),
  });
});

// 0. AI Problem Autofill & Classifier from Plain Description
app.post('/api/gemini/autofill-problem', async (req, res) => {
  try {
    const description = req.body.description || '';
    const result = await autofillProblemFromDescription(description);
    res.json(result);
  } catch (err: any) {
    console.error('Error in /api/gemini/autofill-problem:', err);
    res.status(500).json({ error: err.message || 'Problem autofill failed' });
  }
});

// 1. Citizen Problem Triage API
app.post('/api/gemini/analyze-problem', async (req, res) => {
  try {
    const result = await analyzeCitizenProblem(req.body);
    res.json(result);
  } catch (err: any) {
    console.error('Error in /api/gemini/analyze-problem:', err);
    res.status(500).json({ error: err.message || 'Problem analysis failed' });
  }
});

// 2. AI Technical Starter Blueprint API
app.post('/api/gemini/ideation-blueprint', async (req, res) => {
  try {
    const result = await generateIdeationBlueprint(req.body);
    res.json(result);
  } catch (err: any) {
    console.error('Error in /api/gemini/ideation-blueprint:', err);
    res.status(500).json({ error: err.message || 'Blueprint generation failed' });
  }
});

// 3. AI Code Batch Analysis API (Max 10 files per prompt)
app.post('/api/gemini/analyze-code-batch', async (req, res) => {
  try {
    const result = await analyzeCodeBatch(req.body);
    res.json(result);
  } catch (err: any) {
    console.error('Error in /api/gemini/analyze-code-batch:', err);
    res.status(500).json({ error: err.message || 'Code batch analysis failed' });
  }
});

// 4. AI Solution Evaluator API
app.post('/api/gemini/evaluate-solution', async (req, res) => {
  try {
    const result = await evaluateStudentSolution(req.body);
    res.json(result);
  } catch (err: any) {
    console.error('Error in /api/gemini/evaluate-solution:', err);
    res.status(500).json({ error: err.message || 'Solution evaluation failed' });
  }
});

async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist/index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Pragati Grid server ready on http://0.0.0.0:${PORT}`);
  });
}

startServer();
