// utils/validation.ts

export const validateAuthor = (value: string) => {
    // Check if the author has at least 4 symbols
    const hasMinSymbols = value.length >= 4;
  
    // Check if the author has at least 2 words
    const wordCount = value.trim().split(/\s+/).length;
    const hasMinWords = wordCount >= 2;
  
    // Check if symbols are only Georgian letters
    const isValidSymbols = /^[\u10A0-\u10EA\s]+$/.test(value);
  
    return {

     isValid: hasMinSymbols && hasMinWords && isValidSymbols,
     errorMessage: !hasMinSymbols ? "მინიმუმ 4 სიმბოლო" : !hasMinWords ? "მინიმუმ ორი სიტყვა" : !isValidSymbols ? "მხოლოდ ქართული სიმბოლოები" : null,
    }
    
  };
  
  export const validateTitle = (value: string) => {
    // Check if the title has at least 4 symbols
    const hasMinSymbols = value.length >= 4;
  
    return hasMinSymbols;
  };
  