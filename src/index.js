import dva from 'dva';
import './index.css';
import 'antd-mobile/node_modules/normalize.css/normalize.css';

// 1. Initialize
const app = dva();

// 2. Plugins
// app.use({});

// 3. Model
app.model(require("./models/home"));
app.model(require("./models/details"));
app.model(require("./models/login"));
app.model(require("./models/userlist"));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
