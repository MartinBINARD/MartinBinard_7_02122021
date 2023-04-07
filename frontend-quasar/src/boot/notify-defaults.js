import { Notify } from 'quasar'

Notify.setDefaults({
    position: 'bottom-left',
    timeout: 5000,
    textColor: 'white',
    actions: [{ icon: 'close', color: 'white' }],
});
