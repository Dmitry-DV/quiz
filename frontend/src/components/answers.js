import {UrlManager} from "../utils/url-manager";
import {Auth} from "../services/auth.js";
import {CustomHttp} from "../services/custom-http.js";
import config from "../../config/config.js";

export class Answers {
    constructor() {
        this.quiz = null;
        this.currentQuestionIndex = 1;

        this.routeParams = UrlManager.getQueryParams();
        this.userInfo = Auth.getUserInfo();
        this.testId = this.routeParams.id;
        this.fullName = this.userInfo.fullName;
        const that = this;
        this.email = this.userInfo.email;

        this.init();

        document.getElementById('see-result').onclick = function () {
            location.href = "#/result?id=" + that.routeParams.id;
        };
    };

    async init() {
        if (this.testId && this.userInfo) {
            try {
                const result = await CustomHttp.request(config.host + '/tests/' + this.routeParams.id + '/result/details?userId=' + this.userInfo.userId);
                if (result) {
                    if (result.error) {
                        throw new Error(result.message);
                    }
                    this.quiz = result;
                    this.resultQuiz();
                    return;
                }
            } catch (error) {
                console.log(error);
            }
        }
    };

    resultQuiz() {
        document.getElementById("answers-info-title").innerText = this.quiz.test.name;
        document.getElementById("answer-user").innerText = this.fullName + ', ' + this.email;

        this.quiz.test.questions.forEach(elementQuiz => {
            const titleQuestion = document.createElement("div");
            titleQuestion.className = "answer-question-title";
            titleQuestion.innerHTML = '<span>Вопрос ' + this.currentQuestionIndex++ + ':</span> ' + elementQuiz.question;

            const answersTest = document.getElementById('answers-test')

            const answerQuestion = document.createElement('div');
            answerQuestion.className = "answer-question";
            answerQuestion.appendChild(titleQuestion);

            elementQuiz.answers.forEach(answer => {
                const answerQuestionOption = document.createElement("div");
                answerQuestionOption.className = "answer-question-option";

                const inputId = "answer-" + answer.id;
                const inputElement = document.createElement("input");
                inputElement.className = "option-answer";
                inputElement.setAttribute("id", inputId);
                inputElement.setAttribute("type", "radio");

                const labelElement = document.createElement("label");
                labelElement.setAttribute("for", inputId);
                labelElement.innerText = answer.answer;

                answerQuestionOption.appendChild(inputElement);
                answerQuestionOption.appendChild(labelElement);
                answerQuestion.appendChild(answerQuestionOption);

                if (answer.hasOwnProperty('correct')) {
                    if (answer.correct) {
                        answerQuestionOption.classList.add("right");
                    } else {
                        answerQuestionOption.classList.add("wrong");
                    }
                }
            });
            answersTest.appendChild(answerQuestion);
        });
    }
}

