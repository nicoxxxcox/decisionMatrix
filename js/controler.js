import { Vue } from "./vue.js";
import { Data } from "./model.js";

export class Controler{
    constructor(wrapper) {
        console.log("hello controler");
        this.wrapper = wrapper;
        this.vue = new Vue();
        this.data = new Data();
    }
    /**
       * Return and increment a new choice id
       * @returns {Number}
       */
    incrementLastChoiceId(){
        return this.data.lastChoiceId++;
    }

    /**
       * Return and increment a new factor id
       * @returns {Number}
       */
    incrementLastFactorId(){
        return this.data.lastFactorId++;
    }

    /**
       * @returns {Number}
       */
    countFactors(){
        return this.data.factors.filter((f) => f.visible === true).length;
    }

    /**
       * @returns {Number}
       */
    countChoices(){
        return this.data.choices.filter((c) => c.visible === true).length;
    }

    /**
       * @returns {VoidFunction}
       */
    addFactor(){
        this.incrementLastFactorId();

        this.data.setFactor({
            id: this.data.lastFactorId,
            content: `Factor ${this.data.lastFactorId}`,
            rate: 0,
            visible: true,
            factorsRate: [],
        });

        const sortChoices = this.data.choices.filter((c) => c.visible === true);

        sortChoices.forEach((c) => {
            this.data.setFactorRate(this.data.lastFactorId, c.id, 0);
        });

        this.vue.insertNewRow(this.data);
    }

    /**
       * @returns {VoidFunction}
       */
    addChoice(){
        this.incrementLastChoiceId();

        this.data.setChoice({
            id: this.data.lastChoiceId,
            content: `Choix ${this.data.lastChoiceId}`,
            score: 0,
            visible: true,
        });

        this.data.factors
            .filter((f) => f.visible === true)
            .forEach((factor) =>
                this.data.setFactorRate(factor.id, this.data.lastChoiceId, 0)
            );

        this.vue.insertNewColumn(this.data);
    }

    /**
       * @returns {VoidFunction}
       */
    deleteFactor(el){
        this.data.setFactorInvisible(el.dataset.factorid);
        this.vue.deleteRow(el);
    }

    /**
       * @returns {VoidFunction}
       */
    deleteChoice(el){
        this.data.setChoiceInvisible(el.dataset.choiceid);

        this.vue.deleteColumn(el.dataset.choiceid);
    }

    /**
       * @returns {VoidFunction}
       */
    updateFactorContent(e) {
        this.data.factors[
            e.target.parentNode.dataset.factorid
        ].content = e.target.innerText.trim();
    }

    /**
       * @returns {VoidFunction}
       */
    updateChoiceContent(e){
        this.data.choices[
            e.target.parentNode.dataset.choiceid
        ].content = e.target.innerText.trim();
    }

    /**
       * @returns {VoidFunction}
       */
    updateScore(e){
        this.data.setRate(
            e.target.dataset.factorid,
            e.target.dataset.choiceid,
            this.vue.incrementRate(e)
        );
        this.data.setScore();

        this.data.choices.forEach((c) => {
            if (c.id == e.target.dataset.choiceid) {
                this.vue.updateScore(e.target.dataset.choiceid, c.score);
            }
        });
    }

    /**
       * @returns {VoidFunction}
       */
    updateBestChoice(){
        const content = this.data
            .getBestChoice()
            .map((c) => c.content)
            .join(" / ");

        this.vue.renderBestChoice(content);
    }

    /**
       * Insert the initial template inside wrapper elements
       * @param {HTMLElement} wrapper
       * @returns {VoidFunction}
       */
    initRender(wrapper){
        wrapper.innerHTML = this.vue.getInitTemplate(this.data);
    }

    /**
       * @returns {VoidFunction}
       */
    listenClickEvents(wrapper){
        
        wrapper.addEventListener(
            "click",
            (e) => {
                if (
                    e.target.hasAttribute("data-choiceid") &&
              e.target.hasAttribute("data-factorid")
                ) {
                    this.updateScore(e);
                    this.updateBestChoice();
                } else if (e.target === document.getElementById("addChoice-btn")) {
                    this.addChoice();
                } else if (e.target === document.getElementById("addFactor-btn")) {
                    this.addFactor();
                } else if (e.target.classList.contains("factor-btn__del")) {
                    this.deleteFactor(e.target.parentNode);
                } else if (e.target.classList.contains("choice-btn__del")) {
                    this.deleteChoice(e.target.parentNode);
                } else if (
                    e.target.classList.contains("factor-content") ||
              e.target.classList.contains("choice-content")
                ) {
                    e.target.addEventListener("input", () => {
                        if (e.target.parentNode.dataset.factorid) {
                            this.updateFactorContent(e);
                            this.updateBestChoice();
                        } else if (e.target.parentNode.dataset.choiceid) {
                            this.updateChoiceContent(e);
                            this.updateBestChoice();
                        }
                    });
                }
            },
            true
        );
    }

}