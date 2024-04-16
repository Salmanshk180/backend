import { Request } from "express";
import { Users } from "../../entities/users/users.entity";
import { AppDataSource } from "../../database/database.configuration";

export const delete_user = async (req: Request) => {
  try {
    const userId = req.params.id;
    const userRepository = AppDataSource.getRepository(Users);
    const user = await userRepository.findOne({ where: { id: userId } });
    if (!user) {
      return { statusCode: 404, message: "User not found" };
    }
    const deletedUser = await userRepository.delete(user?.id);
    return {
      statusCode: 200,
      message: "User deleted successfully",
      data: deletedUser,
    };
  } catch (error:any) {
    return { statusCode: 500, message: error.message};
  }
};
