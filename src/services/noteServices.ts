import { Inotes } from '../interfaces/Inote';
import noteModels from '../models/noteModels';
import mongoose from 'mongoose';

export const createNote = async (
  title: string,
  content: string,
  // userId: string, // Jika diperlukan di masa depan
): Promise<Inotes> => {
  try {
    // Memeriksa apakah ada catatan dengan title yang sama
    const existingNote = await noteModels.findOne({ title });

    if (existingNote) {
      throw new Error('A note with this title already exists.');
    }

    // Membuat objek note baru
    const newNote = new noteModels({
      title,
      content,
      // register: [{ userId }], // Jika userId perlu disimpan
    });

    // Menyimpan note ke database
    const savedNote = await newNote.save();

    // Mengembalikan hasil yang telah disimpan
    return savedNote;
  } catch (error) {
    // Menangani error jika ada kegagalan
    throw new Error(`Failed to create note`);
  }
};

/**
 * @swagger
 * /note/all:
 *   get:
 *     summary: Retrieve all notes
 *     tags: [Notes]
 *     responses:
 *       200:
 *         description: Notes retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 200
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Notes retrieved successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: 66f4dabad83ebae0871df529
 *                       title:
 *                         type: string
 *                         example: tes12
 */

export const getAllNotes = async (): Promise<Pick<Inotes, 'title'>[]> => {
  try {
    // Mengambil hanya field title dari semua catatan di database
    const notes = await noteModels.find().select('title');

    // Mengembalikan hasil hanya dengan title
    return notes;
  } catch (error) {
    // Menangani error jika ada kegagalan
    throw new Error(`Failed to retrieve notes`);
  }
};

// Fungsi untuk mendapatkan satu note berdasarkan ID
export const getNoteById = async (id: string): Promise<Inotes | null> => {
  try {
    const objectId = new mongoose.Types.ObjectId(id);
    // Mengambil note berdasarkan ID
    const note = await noteModels.findById(objectId);
    return note;
  } catch (error) {
    // Menangani error jika ada kegagalan
    throw new Error(`Failed to retrieve note by ID:`);
  }
};
