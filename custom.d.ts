import { Session } from 'express-session';
import { Profile } from 'passport-discord';
import { Request } from 'express';

declare module 'express' {
    interface Request {
       
        isAuthenticated(): boolean;
        user?: Profile;
        session: Session & { passport: { user?: Profile } };
    }
}
