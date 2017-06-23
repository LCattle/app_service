require('./../../public/sass/module/satisfaction.scss');
import Header from './../../components/Header/Header';
const questions = window.questions;
import Control from './questions_control';
Header.HeaderInit('问卷调查');
Control._init(questions);


