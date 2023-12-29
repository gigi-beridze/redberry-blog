import { Link } from "react-router-dom";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import calendarIcon from "../../assets/calendar.svg"
import {MultipleSelectChip} from "../ui/selection";
import axios from "axios";
import ImageIcon from '../../assets/formImageIcon.svg';
import RemoveIcon from '../../assets/formRemoveIcon.svg';

import { useSharedBlobState } from "../../hooks/useBlob";

export const AddBlogForm = () => {
    interface MyComponentState {
        inputValue: string;
        errorMessages: string[];
      }


      const [a, setA]:any = useState('')





      const [imageInfo, setImageInfo] = useState<{ link: string | null; name: string }>({ link: null, name: 'No selected file' });
      const inputRef = useRef<HTMLInputElement>(null);
      const [selectedFile, setSelectedFile]:any = useState<File | null>(null);
    
    
      useEffect(() => {
        const storedImageInfo = localStorage.getItem('uploadedImageInfo');
        if (storedImageInfo) {
          setImageInfo(JSON.parse(storedImageInfo));
        }
      }, []);
    
      const handleFileChange = (event: any) => {
        const files = event.target.files;
    
        if (files && files[0]) {
          const newImageInfo = {
            link: URL.createObjectURL(files[0]),
            name: files[0].name,
          };
          setImageInfo(newImageInfo);
    
          // Save the image info in local storage
          localStorage.setItem('uploadedImageInfo', JSON.stringify(newImageInfo))
          console.log(selectedFile)
          const base64Data = btoa(selectedFile);
          const imageDataUrl = event.target.files[0];
          localStorage.setItem('j', imageDataUrl)
    
          if (imageDataUrl) {
            const reader = new FileReader();
      
            reader.onloadend = () => {
              const base64Data = reader.result;
              
              const blob:any = base64ToBlob(base64Data);
              
              setA(blob)
              
          // Save the data URL in local storage
          // localStorage.setItem('blobDataUrl', dataUrl);
        
    
              
              
    
            };
      
            reader.readAsDataURL(imageDataUrl);
          }
        };
      
        const base64ToBlob = (base64Data:any) => {
          const [, data] = base64Data.split(';base64,');
          const byteCharacters = atob(data);
          const byteArrays = [];
      
          for (let offset = 0; offset < byteCharacters.length; offset += 512) {
            const slice = byteCharacters.slice(offset, offset + 512);
            const byteNumbers = new Array(slice.length);
      
            for (let i = 0; i < slice.length; i++) {
              byteNumbers[i] = slice.charCodeAt(i);
            }
      
            const byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
          }
      
          return new Blob(byteArrays, { type: 'image/png' });
        };
      
      }
    
        
    
      const handleClick = () => {
        if (inputRef.current) {
          inputRef.current.click();
        }
      };
    
      function dataURLtoBlob(dataURL:any) {
        const arr = dataURL
        const mime = arr[0].match(/:(.*?);/)[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n);
        }
      
        return new Blob([u8arr], { type: mime });
      }
    
      const handleRemove = () => {
        setSelectedFile(null);
        setImageInfo({ link: null, name: 'No selected file' });
    
        // Remove the image info from local storage
        localStorage.removeItem('uploadedImageInfo');
    
    
      };












    interface ImageData {
        author: string;
        title: string;
        description: string;
        date: string;
        email: string;
        categoryList: string[];
      }

    const [fileName, setFileName] = useState<string>("No selected file");
// e      const sharedBlob:any = localStorage.getItem('blobDataUrl')
    // const [selectedFile, setSelectedFile] = useState<File | null>(null);
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
      checkFormValidity()
    }, [imageData]);
  

    const resetItems = () => {
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
    const storedIsErrorAuthor = localStorage.getItem('isErrorAuthor');
    const storedIsErrorTitle = localStorage.getItem('isErrorTitle');
    const storedIserrorDescription = localStorage.getItem('isErrorDescription');
    const storedisEnteredDate = localStorage.getItem('enteredDate');
    const storedIsEnteredEmail = localStorage.getItem('enteredEmail')
        
    if(storedIsEnteredEmail) setIsEnteredEmail(JSON.parse(storedIsEnteredEmail))
    if( storedisEnteredDate) setIsEnteredDate(JSON.parse(storedisEnteredDate));
    if (storedIserrorDescription) setIsErrorDescription(JSON.parse(storedIserrorDescription));
    if (storedIsErrorTitle) setIsErrorTitle(JSON.parse(storedIsErrorTitle));
    if (storedIsErrorAuthor) setIsErrorAuthor(JSON.parse(storedIsErrorAuthor));
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

    const [isErrorAuthor, setIsErrorAuthor] = useState('')
    const [isErrorTitle, setIsErrorTitle] = useState('')
    const [isErrorDescription, setIsErrorDescription] = useState('')
    const [isEnteredDate, setIsEnteredDate] = useState('')   
    const [isEnteredEmail, setIsEnteredEmail] = useState('')
 // Inside your component
  const [isEverythingOkay, setIsEverytingOkay] = useState(false)
 const checkFormValidity = () => {
  const areAllInputsEmpty =
  isErrorAuthor.trim() === 'form-input-correct' &&
  isErrorTitle.trim() === 'form-input-correct' &&
  isErrorDescription.trim() === 'form-input-correct' &&
  isEnteredDate.trim() === 'form-input-correct' &&
  isEnteredEmail.trim() === 'form-input-correct';

  areAllInputsEmpty ? setIsEverytingOkay(true) : setIsEverytingOkay(false)
 } 
const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, property: string) => {
    const { value } = e.target;
    setImageData((prevData) => ({ ...prevData, [property]: value }));
  
    // Reset all borders to the default color
    setMinSymbolAuthor('form-correct-color');
    setminWordAuthor('form-correct-color');
    setGeoWord('form-correct-color');
    setIsErrorAuthor('form-input-correct');
  
    if (value.length < 4) {
      setMinSymbolAuthor('form-error-color');
      setIsErrorAuthor('form-input-error');
    }
  
    if (value.split(' ').filter((word) => word.trim() !== '').length < 2) {
      setminWordAuthor('form-error-color');
      setIsErrorAuthor('form-input-error');
    }
  
    if (!/^[\u10D0-\u10FF\s]+$/.test(value)) {
      setGeoWord('form-error-color');
      setIsErrorAuthor('form-input-error');
    }
  
    localStorage.setItem('minSymbolAuthor', minSymbolAuthor);
    localStorage.setItem('minWordAuthor', minWordAuthor);
    localStorage.setItem('geoWord', geoWord);
    localStorage.setItem('isErrorAuthor', JSON.stringify(isErrorAuthor));
  };
  

const handeTitleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, property: string) => {
    const { value } = e.target;
    setImageData((prevData) => ({ ...prevData, [property]: value }));

    setMinSymbolTitle('form-correct-color')
    setIsErrorTitle('form-input-correct')
    if(value.length < 2) {
        setMinSymbolTitle('form-error-color')
        setIsErrorTitle('form-input-error')
      }

      localStorage.setItem('minSymbolTitle', minSymbolTitle); 
      localStorage.setItem('isErrorTitle', JSON.stringify(isErrorTitle));

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

const [isValid, setIsValid] = useState(true)



    const handleDescriptionChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, property: string) => {
        const { value } = e.target;
        setImageData((prevData) => ({ ...prevData, [property]: value }));
        setMinSymbolDescription('form-correct-color')
        setIsErrorDescription('form-input-correct')

        if(value.length < 2) {
            setMinSymbolDescription('form-error-color')
            setIsErrorDescription('form-input-error')
          } 
          localStorage.setItem('minSymbolDescription', minSymbolDescription); 
          localStorage.setItem('isErrorDescription', JSON.stringify(isErrorDescription));
    }
    const handleDateChange = (e:  ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, property: string) => {
        const { value } = e.target;

        setImageData((prevData) => ({ ...prevData, [property]: value }));
        localStorage.setItem('enteredDate', JSON.stringify('form-input-correct'));
    }
    const handleEmailChange = (e:  ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, property: string) => {
      const { value } = e.target;
      setImageData((prevData) => ({ ...prevData, [property]: value }));


      const isValidEmail = value !== '' && /^[^\s@]+@redberry\.ge$/.test(value);

      if (isValidEmail) {
        setIsValid(true)
        setIsEnteredEmail('form-input-correct')
      } else {
        setIsValid(false);
        setIsEnteredEmail('form-input-error')
      }

      localStorage.setItem('enteredEmail', JSON.stringify(isEnteredEmail));
  }







  const submitForm = () => {
    console.log('fa')
    const addBlog = async () => {

    try {
      // Set the API endpoint
      const url = 'https://api.blog.redberryinternship.ge/api/blogs',
      token = '5695cf4697d45243e6bdab77e34fe2578befea217e5a12e7e7c925a217704ac2';

      const formData = new FormData();
      formData.append('title', imageData.title);
      formData.append('description', imageData.description);
  
      formData.append("image", a);
      formData.append('author', imageData.author);
      formData.append('publish_date', imageData.date);
      formData.append('categories', JSON.stringify([4, 5]));
      formData.append('email', imageData.email);
  
      // Send the POST request
      
        await axios.post(url, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        
  
      })
      resetItems()
    
    } catch (error) {
      // Handle errors
      console.error('Error adding blog:', error);
    }
  }
  addBlog()
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
            <div>
      {imageInfo.link || selectedFile ? (
        <UploadedImage handleRemove={handleRemove} selectedFile={selectedFile} imageInfo={imageInfo} />
      ) : (
        <div className="uploader">
          <div style={{ paddingBottom: '8px' }}>
            <span className="input-title" style={{ marginTop: '24px' }}>
              ატვირთეთ ფოტო
            </span>
          </div>
          <form onClick={handleClick}>
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              className="input-field"
              hidden
              onChange={handleFileChange}
            />
            <>
              <button className="input-field-uploader">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                  <path
                    opacity="0.4"
                    d="M36.233 15.7333H3.33301V10.7C3.33301 6.63333 6.63301 3.33333 10.6997 3.33333H14.583C17.2997 3.33333 18.1497 4.21667 19.233 5.66667L21.5663 8.76667C22.083 9.45 22.1497 9.55 23.1163 9.55H27.7663C31.7163 9.53333 35.083 12.1333 36.233 15.7333Z"
                    fill="#5D37F3"
                  />
                  <path
                    d="M36.6497 18.0667C36.6163 17.25 36.483 16.4833 36.233 15.7333H3.33301V27.75C3.33301 32.6667 7.33301 36.6667 12.2497 36.6667H27.7497C32.6663 36.6667 36.6663 32.6667 36.6663 27.75V18.45C36.6663 18.3333 36.6663 18.1833 36.6497 18.0667ZM24.1663 27.0833H21.3497V30C21.3497 30.6833 20.783 31.25 20.0997 31.25C19.4163 31.25 18.8497 30.6833 18.8497 30V27.0833H15.833C15.1497 27.0833 14.583 26.5167 14.583 25.8333C14.583 25.15 15.1497 24.5833 15.833 24.5833H18.8497V21.6667C18.8497 20.9833 19.4163 20.4167 20.0997 20.4167C20.783 20.4167 21.3497 20.9833 21.3497 21.6667V24.5833H24.1663C24.8497 24.5833 25.4163 25.15 25.4163 25.8333C25.4163 26.5167 24.8497 27.0833 24.1663 27.0833Z"
                    fill="#5D37F3"
                  />
                </svg>
              </button>
              <p className="input-field-uploader-text">
                ჩააგდეთ ფაილი აქ ან <a className="uploader-a">აირჩიეთ ფაილი</a>
              </p>
            </>
          </form>
        </div>
      )}
    </div>        <div className="form-author-title">
            <div className="form-author form-inputs">
                <label>
                    <span className="input-title">ავტორი*</span>
                    <input 
                        type="text" 
                        placeholder="შეიყვანეთ ავტორი"
                        value={imageData.author}
                        onChange={(e) => handleInputChange(e, 'author')}
                        className={isErrorAuthor}
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
                        className={`form-input ${isErrorTitle}`}
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
                    className={`form-input ${isErrorDescription}`}
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
                        className={isEnteredDate}
                        type="date" 
                        value={imageData.date}
                        onChange={(e:any) => handleDateChange(e, 'date')}
                    />   
                    
                </label>  
            </div>
            <div className="form-date form-title form-inputs">
            <label>
                <span className="input-title">გამოქვეყნების თარიღი*</span>
                <MultipleSelectChip />
            </label>  
        </div>
        </div>
        <div className="form-email form-author-title form-inputs">
            <label>
                <span className="input-title">ელ-ფოსტა</span>
                <input 
                    className={`form-email-input ${isEnteredEmail}`}
                    type="email" 
                    placeholder="Example@redberry.ge" 
                    value={imageData.email}
                    onChange={(e) => handleEmailChange(e, 'email')}
                />   
                { isValid === false ? (
                <p  style={{maxWidth: '288px'}} className="error-message">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M10.0002 1.66666C5.41683 1.66666 1.66683 5.41666 1.66683 10C1.66683 14.5833 5.41683 18.3333 10.0002 18.3333C14.5835 18.3333 18.3335 14.5833 18.3335 10C18.3335 5.41666 14.5835 1.66666 10.0002 1.66666Z" fill="#EA1919"/>
                  <path d="M10 13.3333L10 9.16666" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M10.0044 6.66667L9.99691 6.66667" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>  
                &nbsp; <span style={{paddingLeft: '2px'}} >მეილი უნდა მთავრდებოდეს @redberry.ge-ით</span>
              </p>
                ) : '' }
            </label>
        </div>
        <div className="form-submit">
          {isEverythingOkay ? (<button onClick={submitForm} className="isOkayBtn">გამოქვეყნება</button>) : <button disabled>გამოქვეყნება</button>

          }
        </div>
    </div>
    );
};






const UploadedImage = ({ handleRemove, selectedFile, imageInfo }: { handleRemove: () => void; selectedFile: any; imageInfo: any }) => {
  return (
    <div className="uploaded-image">
      <div className="uploaded-image-item">
        <img src={ImageIcon} alt="image_icon" />
        <span className="selected-image-form">Selected Image: {selectedFile?.name || imageInfo.name}</span>
      </div>
      <button className="image-remove-form" onClick={handleRemove}>
        <img src={RemoveIcon} alt="remove_icon" />
      </button>
    </div>
  );
}
