import { ProjectResponse } from "./projectResponse.mode";
import { Role } from "./role.enum";

export class User {
    userId:string = "";
    email:string = "";
    firstName:string="";
    lastName:string="";
    token:string="";
    projects:Array<ProjectResponse>=[];
    role:Role = Role.USER;
}