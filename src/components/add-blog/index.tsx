import { Link } from "react-router-dom";
import { Uploader } from "../ui/uploader"
import { ChangeEvent, useEffect, useRef, useState } from "react";
import calendarIcon from "../../assets/calendar.svg"

export const AddBlogForm = () => {
    interface MyComponentState {
        inputValue: string;
        errorMessages: string[];
      }

    const initialState: any = {
        minLetterAuthor: '#85858D',
        minWordAuthor: '#85858D',
        geoWordAuthor: '#85858D',
    };


    interface ImageData {
        author: string;
        title: string;
        description: string;
        date: string;
        email: string;
        categoryList: string[];
      }
      const [textColor, setTextColor] = useState<string>('gray');


    const [fileName, setFileName] = useState<string>("No selected file");
    const inputRef = useRef<HTMLInputElement>(null);

    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [imageData, setImageData] = useState<ImageData>(() => {
      const storedImageData = localStorage.getItem('imageData');
      if (storedImageData) {
        return JSON.parse(storedImageData);
      } else {
        return {
          author: '',
          title: '',
          description: '',
          date: '',
          email: '',
          categoryList: [],
        };
      }
    });
  
    useEffect(() => {
      localStorage.setItem('imageData', JSON.stringify(imageData));
    }, [imageData]);
  

  
    const handleRemove = () => {
      setSelectedFile(null);
      setFileName('No selected file');
      setImageData({
        author: '',
        title: '',
        description: '',
        date: '',
        email: '',
        categoryList: [],
      });
    };

     useEffect(() => {
    const storedMinSymbolAuthor = localStorage.getItem('minSymbolAuthor');
    const storedMinWordAuthor = localStorage.getItem('minWordAuthor');
    const storedGeoWord = localStorage.getItem('geoWord');
    const storedMinSymbolTitle = localStorage.getItem('minSymbolTitle');
    const storedMinSymbolDescription = localStorage.getItem('minSymbolDescription')

    if (storedMinSymbolAuthor) setMinSymbolAuthor(storedMinSymbolAuthor);
    if (storedMinWordAuthor) setminWordAuthor(storedMinWordAuthor);
    if (storedGeoWord) setGeoWord(storedGeoWord);
    if (storedMinSymbolTitle) setMinSymbolTitle(storedMinSymbolTitle)
    if (storedMinSymbolDescription) setMinSymbolDescription(storedMinSymbolDescription)
  }, []);

    const [minSymbolAuthor, setMinSymbolAuthor] = useState('')
    const [minWordAuthor, setminWordAuthor] = useState('')
    const [geoWord, setGeoWord] = useState('')
    const [minSymbolTitle, setMinSymbolTitle] = useState('')
    const [minSymbolDescription, setMinSymbolDescription] = useState('')

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, property: string) => {
  const { value } = e.target;
  setImageData((prevData) => ({ ...prevData, [property]: value }));



  if(value.length <= 4) {
    setMinSymbolAuthor('form-error-color')
} else if(value.length >= 4){
    setMinSymbolAuthor('form-correct-color')
} 
 if(value.split(' ').filter((word) => word.trim() !== '').length < 2) {
    setminWordAuthor('form-error-color')
} else if(value.split(' ').filter((word) => word.trim() !== '').length >= 2) {
    setminWordAuthor('form-correct-color')
}
if(/^[\u10D0-\u10FF\s]+$/.test(value)) {
    setGeoWord('form-correct-color')
} else {
    setGeoWord('form-error-color')
}


localStorage.setItem('minSymbolAuthor', minSymbolAuthor);
localStorage.setItem('minWordAuthor', minWordAuthor);
localStorage.setItem('geoWord', geoWord);


};

const handeTitleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, property: string) => {
    const { value } = e.target;
    setImageData((prevData) => ({ ...prevData, [property]: value }));

    if(value.length < 2) {
        setMinSymbolTitle('form-error-color')
      } else  if(value.length >= 2){
        setMinSymbolTitle('form-correct-color')
      }
      localStorage.setItem('minSymbolTitle', minSymbolTitle); 

}
  
    const handleCategoryChange = (e: ChangeEvent<HTMLInputElement>) => {
      const { checked, value } = e.target;
      setImageData((prevData) => ({
        ...prevData,
        categoryList: checked
          ? [...prevData.categoryList, value]
          : prevData.categoryList.filter((category) => category !== value),
      }));
    };





    const handleDescriptionChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, property: string) => {
        const { value } = e.target;
        setImageData((prevData) => ({ ...prevData, [property]: value }));

        if(value.length < 2) {
            setMinSymbolDescription('form-error-color')
          } else  if(value.length >= 2){
            setMinSymbolDescription('form-correct-color')
          }
          localStorage.setItem('minSymbolDescription', minSymbolDescription); 
    }


    return (
        <div className="add-blog-form">
            <Link to="/" className="detail-back-btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 44 44" fill="none">
                    <rect width="44" height="44" rx="22" fill="#E4E3EB"/>
                    <path d="M18 23C18.5523 23 19 22.5523 19 22C19 21.4477 18.5523 21 18 21L18 23ZM17.1929 21.2929C16.8024 21.6834 16.8024 22.3166 17.1929 22.7071L23.5569 29.0711C23.9474 29.4616 24.5805 29.4616 24.9711 29.0711C25.3616 28.6805 25.3616 28.0474 24.9711 27.6569L19.3142 22L24.9711 16.3431C25.3616 15.9526 25.3616 15.3195 24.9711 14.9289C24.5805 14.5384 23.9474 14.5384 23.5569 14.9289L17.1929 21.2929ZM18 21L17.9 21L17.9 23L18 23L18 21Z" fill="#1A1A1F"/>
                </svg>
            </Link>
            <div className="add-blog-title">
                <span>ბლოგის დამატება</span>
            </div>
        <Uploader />
        <div className="form-author-title">
            <div className="form-author form-inputs">
                <label>
                    <span className="input-title">ავტორი*</span>
                    <input 
                        type="text" 
                        placeholder="შეიყვანეთ ავტორი"
                        value={imageData.author}
                        onChange={(e) => handleInputChange(e, 'author')}
                    />        
                    <ul className="form-error">
                        <li className={minSymbolAuthor}>მინიმუმ 4 სიმბოლო</li>    
                        <li className={minWordAuthor}>მინიმუმ ორი სიტყვა</li>
                        <li className={geoWord}>მხოლოდ ქართული სიმბოლოები</li>
                    </ul> 
                </label>               
            </div>
            <div className="form-title form-inputs">
                <label>
                    <span className="input-title">სათაური*</span>
                    <input 
                        type="text" 
                        placeholder="შეიყვანეთ სათაური" 
                        value={imageData.title}
                        onChange={(e) => handeTitleChange(e, 'title')}
                    /> 
                    <ul className="form-error form-error-none">
                        <li className={minSymbolTitle}>მინიმუმ 2 სიმბოლო</li>
                    </ul>  
                </label>               
            </div>
        </div>
        <div className="form-description pd-form-text form-inputs">
            <label>
                <span className="input-title">აღწერა*</span>
                <textarea
                    placeholder="შეიყვანეთ აღწერა"
                    value={imageData.description}
                        onChange={(e) => handleDescriptionChange(e, 'description')}
                />
                <ul className="form-error form-error-none">
                    <li className={minSymbolDescription}>მინიმუმ 2 სიმბოლო</li>
                </ul>
            </label>
        </div>
        <div className="form-author-title">
            <div className="form-date form-inputs">
                <label className="date-input-container">
                    <span className="input-title">გამოქვეყნების თარიღი*</span>
                    <img src={calendarIcon} className="date-icon" />
                    <input 
                        className="date-input"
                        type="date" 
                        value={imageData.date}
                        onChange={(e) => handleInputChange(e, 'date')}
                    />   
                </label>  
            </div>
            <div className="form-date form-title form-inputs">
            <label>
                <span className="input-title">გამოქვეყნების თარიღი*</span>
                <input type="date" />   
            </label>  
        </div>
        </div>
        <div className="form-email form-author-title form-inputs">
            <label>
                <span className="input-title">ელ-ფოსტა</span>
                <input 
                    className="form-email-input" 
                    type="email" 
                    placeholder="Example@redberry.ge" 
                    value={imageData.email}
                    onChange={(e) => handleInputChange(e, 'email')}
                />   
            </label>
        </div>
        <div className="form-submit">
            <button>გამოქვეყნება</button>
        </div>
    </div>
    );
};