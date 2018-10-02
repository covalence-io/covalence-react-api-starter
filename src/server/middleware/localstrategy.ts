import * as passport from 'passport';
import * as LocalStrategy from 'passport-local';

import { ComparePassword } from '../utils/security/passwords';
import { Users } from '../db';

passport.use(new LocalStrategy.Strategy({
        usernameField: 'email'
}, async (email, password, done) => {

    try {
        let user = await Users.findOne({ email });
        if(ComparePassword(password, user.password)) {
            done(null, user);
        } else {
            done(null, false);
        }
    } catch(e) {
        done(e);
    }

}));