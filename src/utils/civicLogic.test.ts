import test from 'node:test';
import assert from 'node:assert/strict';
import {
  sanitizeInput,
  validateImageUpload,
  validateZipUpload,
  calculatePriorityScore,
  nudgePriorityScore,
  generateCertificateId,
  isApprovedForCertificate,
  buildLinkedInCertUrl,
  chunkFilesForGemini,
} from './civicLogic.ts';

test('sanitizeInput strips script tags and html correctly', () => {
  const dirty = '<script>alert("xss")</script><p>Faulty voltage regulator</p>';
  const clean = sanitizeInput(dirty);
  assert.equal(clean, 'Faulty voltage regulator');
});

test('validateZipUpload validates zip extension and size', () => {
  const badExt = validateZipUpload(1000, 'code.tar.gz');
  assert.equal(badExt.valid, false);

  const tooBig = validateZipUpload(20 * 1024 * 1024, 'code.zip');
  assert.equal(tooBig.valid, false);

  const goodZip = validateZipUpload(2 * 1024 * 1024, 'my-prototype.zip');
  assert.equal(goodZip.valid, true);
});

test('chunkFilesForGemini splits files into batches of max 10 files', () => {
  const files = Array.from({ length: 25 }, (_, i) => `file_${i + 1}.ts`);
  const batches = chunkFilesForGemini(files, 10);
  assert.equal(batches.length, 3);
  assert.equal(batches[0].length, 10);
  assert.equal(batches[1].length, 10);
  assert.equal(batches[2].length, 5);
});

test('generateCertificateId returns valid PRG-2026-XXXXXX format', () => {
  const certId = generateCertificateId('test-pragati-1');
  assert.match(certId, /^PRG-2026-[0-9A-F]{6}$/);
});

test('buildLinkedInCertUrl includes Pragati Grid branding', () => {
  const url = buildLinkedInCertUrl({
    certificateId: 'PRG-2026-A1B2C3',
    problemTitle: 'Smart Feeder Optimizer',
    studentName: 'Vikram Malhotra',
  });
  assert.ok(url.includes('PRG-2026-A1B2C3'));
  assert.ok(url.includes('Pragati%20Grid') || url.includes('Pragati+Grid'));
});
