import { getAllAvailableRoles } from "@/server/controllers/user.controller";

export async function GET(){
    return getAllAvailableRoles()
}