import { localize, setLocale } from '@vee-validate/i18n';
import { defineRule, configure } from 'vee-validate';
import { required, between,email, confirmed } from '@vee-validate/rules';
import en from '../i18n/en.json';
import ar from '../i18n/ar.json';


configure({
    generateMessage: localize({
        ar,
        en,
    },
    ),
});

let locale= localStorage.getItem("lang") || 'en'
setLocale(locale)
export default {
    install(app) {
        // Define global rules
        defineRule('required', required);
        defineRule('email', email);
        defineRule('between', between);
        defineRule('confirmed', confirmed);
    }
};

