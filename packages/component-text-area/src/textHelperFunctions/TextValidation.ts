export function ValidateText(text: string, textRule: any) {
    let msg: string | undefined = "";
    let updatedText = text;
    const numberOfLines = textRule.numberOfTextLines;
    const textValidations = textRule.textValidation;
    let isTextValid = true;
    if (validateForEmojiIcons(text) && validateHtmlTag(text)) {
        updatedText = text;
        isTextValid = true;
    } else {
        let updatedData = { msg: textValidations.message, updatedText: text, isTextValid: isTextValid };
        return updatedData;
    }
    if (
        numberOfLines &&
        numberOfLines.allow &&
        numberOfLines.defaultValue &&
        parseInt(numberOfLines.defaultValue)
    ) {
        const lines = text.split("\n");
        if (
            +numberOfLines.defaultValue > 0 &&
            lines.length > +numberOfLines.defaultValue

        ) {
            msg = numberOfLines.message;
            updatedText = updatedText.substring(0, text.lastIndexOf("\n"));
            isTextValid = false;
        }
        else {
            isTextValid = true;
        }
    }
    if (msg != "") {
        let updatedData = { msg: msg, updatedText: updatedText, isTextValid: isTextValid };
        return updatedData;
    }

    if (
        textValidations &&
        textValidations.defaultValue &&
        textValidations.defaultValue != "none"
    ) {
        let validationRule = textValidations.defaultValue.trim();

        switch (validationRule) {
            case "AutoUpper":
                updatedText = updatedText.toUpperCase();
                break;
            case "AutoLower":
                updatedText = updatedText.toLowerCase();
                break;
            case "A-Z":
                if (updatedText !== updatedText.toUpperCase()) {
                    updatedText = updatedText.replace(/[a-z]/gm, "");
                    msg = textValidations.message;
                    isTextValid = false;
                }
                break;
            case "a-z":
                if (text !== text.toLowerCase()) {
                    updatedText = text.replace(/[A-Z]/gm, "");
                    msg = textValidations.message;
                    isTextValid = false;
                }
                break;

            case "0-9":
                let isMatch = /^\d+$/g.test(updatedText);

                if (updatedText == "") {
                    isMatch = true;
                }
                msg = isMatch ? "" : textValidations.message;
                if (!isMatch) {
                    isTextValid = false;
                }
                else {
                    isTextValid = true;
                }
                updatedText = updatedText ? updatedText.replace(/\D+/g, "") : "";

                break;
            case "none":
                break;
            default:
                let isValid = new RegExp(validationRule).test(updatedText);
                msg = isValid ? "" : textValidations.message;
                if (!isValid) {
                    isTextValid = false;
                }
                else {
                    isTextValid = true;
                }
                break;
        }
    }
    if (msg != "") {
        return { msg: msg, updatedText: updatedText, isTextValid: isTextValid };
    }

    const charLimit = textRule.characterLimit;
    if (charLimit && charLimit.allow) {
        let updatedData = validateCharLimit(updatedText, charLimit);

        if (updatedData && updatedData.msg != "") {
            return updatedData;
        }
    }

    let updatedData = { msg: msg, updatedText: updatedText, isTextValid: isTextValid };
    return updatedData;
}
export function validateCharLimit(text: string, validation: any) {
    let textLines = text.split("\n");
    let textData = { text: text, msg: "", isValid: true };
    let msg = "";
    let updatedText = "";
    let isCharacterValid = true;
    const iterateValidation = (customIndex?: number | undefined) => {
        for (const index in textLines) {
            textData = isTextValid(
                typeof customIndex !== "undefined" ? customIndex : +index,
                textLines[index],
                validation
            );
            if (!textData.isValid) {
                textLines[index] = textData.text;
                break;
            }
        }
    };

    const checkForAllLines = () => {
        textData = isTextValid(0, text, validation)
    }
    if (validation.extra.selectedType === "CharacterLimitPerLine") {
        iterateValidation(0);
    }

    if (validation.extra.selectedType === "CharacterLimitIndividualLine") {
        iterateValidation();
    }

    if (validation.extra.selectedType === "CharacterLimitAllLines") {
        checkForAllLines();
    }

    if (!textData.isValid) {
        updatedText = textData.text;
        msg = textData.msg;
        isCharacterValid = false;
        return { updatedText: updatedText, msg: msg, isTextValid: isCharacterValid };
    }

    return { updatedText: updatedText, msg: msg, isTextValid: isCharacterValid };
}
export function isTextValid(lineIndex: number, text: string, validationData: any) {
    let validation = validationData.extra.externalData;

    let data = { text, msg: "", isValid: true };
    if (text.length < +validation[lineIndex].MinimumCharLimit) {
        data.msg = validationData.message;
        data.isValid = false;
        return data;
    }
    if (
        +validation[lineIndex].MaximumCharLimit > 0 &&
        text.length > +validation[lineIndex].MaximumCharLimit
    ) {
        data.msg = validationData.message;
        data.text = data.text.substring(
            0,
            +validation[lineIndex].MaximumCharLimit
        );
        data.isValid = false;
        return data;
    }
    return data;
}

/* Method to validate whether given text contain  emoji icons. It return true if text does not contain emoji icon otherwise false
      @param{string}{text}: text to validate
      @returns{boolean}: true if text does not contain emoji icons otherwise returns false*/
export function validateForEmojiIcons(text: string) {
    var pattern =
        /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/g;
    return pattern.test(text) ? false : true;
}

/* Method to validate whether given text contain  html tags. It return true if text does not contain html tags otherwise false
              @param{string}{text}: text to validate
              @returns{boolean}: true if text does not contain html tags otherwise returns false*/
export function validateHtmlTag(text: string) {
    if (text.match(/<(\"[^\"]*\"|'[^']*'|[^'\">])*>/i) == null) return true;
    else return false;
}


