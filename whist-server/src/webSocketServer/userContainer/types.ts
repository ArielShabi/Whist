import { UserInfo } from "../../types";

export type User = UserInfo & {        
    connection: WebSocketClient;
}
