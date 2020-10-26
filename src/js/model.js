export class Data{
    constructor() {
        console.log("hello data");
    


    
        this.choicesCount = 0,
        this.factorsCount = 0,
        this.lastChoiceId = 0,
        this.lastFactorId = 0,
        this.choices = [
            {
                id: 0,
                content: "first choice",
                score: 0,
                visible: true,
            },
        ],
        this.factors = [
            {
                id: 0,
                content: "Factor 0",
                rate: 0,
                visible: true,

                factorsRate: [
                    {
                        choiceId: 0,
                        rate: 0,
                    },
                ],
            },
        ];
    }
        

    /**
       * @returns {Object}
       */
    getChoice(id){
        return this.choices.find((choice) => choice.id === id);
    }

    /**
       * return all choices
       * @returns {Array}
       */
    getAllChoices(){
        return this.choices;
    }

    /**
       * @returns {Object}
       */
    getFactor(id){
        return this.factors.find((factor) => factor.id == id);
    }

    /**
       * return all factors
       * @returns {Array}
       */
    getAllFactors(){
        return this.factors;
    }

    getFactorRate(factorId, ChoiceId){
        let result;
        this.factors.forEach((factor) => {
            factor.factorsRate.forEach((rate) => {
                if (factor.id === factorId && rate.choiceId === ChoiceId) {
                    result = rate;
                }
            });
        });
        return result;
    }

    /**
       *  @returns {Array}
       */
    getBestChoice(){
        const high = this.choices
            .filter((c) => c.visible === true)
            .reduce((prev, current) =>
                prev.score > current.score ? prev : current
            );

        return this.choices.filter((c) => c.score === high.score);
    }

    /**
       * set a new choice
       * @param {Object} choice
       */
    setChoice(choice){
        this.choices.push(choice);
    }

    /**
       * set a new factor
       * @param {Object} factor
       */
    setFactor(factor){
        this.factors.push(factor);
    }

    /**
       * set new factor rate
       * @param {Object} factorRate
       *
       * TODO : just set rate if object already exist
       */
    setFactorRate(fid, cid, rate){
        this.factors.forEach((factor) => {
            if (factor.id == fid) {
                factor.factorsRate.push({
                    choiceId: cid,
                    rate: rate,
                });
            }
        });
    }

    setRate(fid, cid, scor){
        this.factors.forEach((factor) => {
            if (factor.id == fid) {
                factor.factorsRate.forEach((rate) => {
                    if (rate.choiceId == cid) {
                        rate.rate = scor;
                    }
                });
            }
        });
    }

    /**
       * @returns {VoidFunction}
       */
    setFactorVisible(id){
        this.factors.forEach((factor) => {
            if (factor.id == id && factor.visible == false) {
                factor.visible = true;
            }
        });
    }

    /**
       * @returns {VoidFunction}
       */
    setFactorInvisible(id){
        this.factors.forEach((factor) => {
            if (factor.id == id && factor.visible == true) {
                factor.visible = false;
            }
        });
    }

    /**
       * @returns {VoidFunction}
       */
    setChoiceVisible(id){
        this.choices.forEach((choice) => {
            if (choice.id == id && choice.visible == false) {
                choice.visible = true;
            }
        });
    }
    /**
       * @returns {VoidFunction}
       */
    setChoiceInvisible(id){
        this.choices.forEach((choice) => {
            if (choice.id == id && choice.visible == true) {
                choice.visible = false;
            }
        });
    }

    /**
       * @returns {VoidFunction}
       */
    setScore(){

        this.choices.forEach((c) => {
            let l = 0;

            this.factors.forEach((f) => {
                f.factorsRate.forEach((r) => {
                    if (r.choiceId === c.id) {
                        l += r.rate;
                    }
                });
            });
            c.score = l;
        });
    }
}