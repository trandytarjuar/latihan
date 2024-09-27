import { Request, Response } from 'express';
import httpStatus from 'http-status';
import * as noteService from '../services/noteServices';
import { sendSuccessResponse, sendErrorResponse } from '../utils/responseFormatter';

// export const CreatedNote = async (req: Request, res: Response) => {
//   try {
//     const { title, content } = req.body;

//     // if (!req.user || typeof req.user === 'string' || !('id' in req.user)) {
//     //   return sendErrorResponse(res, httpStatus.UNAUTHORIZED, 'User not authenticated');
//     // }

//     // Ambil userId dari req.user
//     // const userId = (req.user as { id: string }).id; // Casting untuk memastikan userId ada

//     // Panggil service untuk membuat note dengan userId
//     // const create = await noteService.createNote(title, content, userId);
//     const create = await noteService.createNote(title, content);

//     sendSuccessResponse(res, httpStatus.OK, 'create note Succes');
//   } catch (error) {
//     sendErrorResponse(res, httpStatus.INTERNAL_SERVER_ERROR, 'create note failed');
//   }
// };
export const CreatedNote = async (req: Request, res: Response) => {
  try {
    const { title, content } = req.body;

    // Memanggil service untuk membuat note
    const create = await noteService.createNote(title, content);

    // Mengirim respon sukses
    sendSuccessResponse(res, httpStatus.OK, 'Note created successfully');
  } catch (error) {
    // Melakukan type assertion untuk error
    if (error instanceof Error) {
      if (error.message === 'A note with this title already exists.') {
        return sendErrorResponse(res, httpStatus.CONFLICT, error.message); // Menggunakan status 409 untuk konflik
      }
    }
    sendErrorResponse(res, httpStatus.INTERNAL_SERVER_ERROR, 'Failed to create note');
  }
};

export const getAllNotes = async (req: Request, res: Response) => {
  try {
    const notes = await noteService.getAllNotes();
    sendSuccessResponse(res, httpStatus.OK, notes, 'Notes retrieved successfully');
  } catch (error) {
    sendErrorResponse(res, httpStatus.INTERNAL_SERVER_ERROR, 'Failed to retrieve notes');
  }
};

// Controller untuk mendapatkan note berdasarkan ID
export const getNoteById = async (req: Request, res: Response) => {
  try {
    // Mengambil id dari query parameter (req.query)
    const { id } = req.query;
    console.log(id, 'id note controller');

    // Validasi jika id tidak ada di query
    if (!id || typeof id !== 'string') {
      return sendErrorResponse(
        res,
        httpStatus.BAD_REQUEST,
        'ID query parameter is required and must be a string',
      );
    }

    const noteId = await noteService.getNoteById(id);

    if (!noteId) {
      return sendErrorResponse(res, httpStatus.NOT_FOUND, 'Note not found');
    }

    sendSuccessResponse(res, httpStatus.OK, noteId, 'Note retrieved successfully');
  } catch (error) {
    console.error(error, 'Error in getNoteById controller');
    sendErrorResponse(res, httpStatus.INTERNAL_SERVER_ERROR, 'Failed to retrieve note');
  }
};
