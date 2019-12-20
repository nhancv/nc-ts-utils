/*
 * MIT License
 *
 * Copyright (c) 2018 Nhan Cao
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */

/**
 * For BullMQ
 * Docs: https://docs.bullmq.io
 * Required: Redis installed first
 */

import { Queue, Worker, QueueEvents } from 'bullmq'

export default class BullMQJob {

  async execute() {

    // Create new queue and push some jobs
    const myQueue = new Queue('fistQueue');
    async function addJobs(){
      await myQueue.add('myJobName1', { foo: 'bar' });
      await myQueue.add('myJobName2', { qux: 'baz' });
    }

    // Tracking specific queue internally
    const worker = new Worker('fistQueue', async job => {
      // Will print { foo: 'bar'} for the first job
      // and { qux: 'baz' } for the second.
      console.log(job.data);
    });
    worker.on('completed', (job) => {
      console.log(`Worker job:${job.id} has completed!`);
    });
    worker.on('failed', (job, err) => {
      console.log(`Worker job:${job.id} has failed with ${err.message}`);
    });

    // Tracking queue events globally
    const queueEvents = new QueueEvents('fistQueue');
    queueEvents.on('completed', (event) => {
      console.log(`Event job:${event.jobId} has completed!`);
    });
    queueEvents.on('failed', (event, err) => {
      console.log(`Event job:${event.jobId} has failed with ${err.message}`);
    });

    // Test
    await addJobs();

  }
}

