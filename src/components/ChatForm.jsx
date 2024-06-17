import React, { useState } from 'react';
import "../styles/Chat.scss"

import saveAs from 'file-saver';

const ChatForm = () => {
    const [responses, setResponses] = useState({
        days: '',
        withChildren: '',
        hotel: '',
        historicalSites: '',
        culturalSites: '',
        cafes: '',
        budget: '',
    });
    const [response, setResponse] = useState('');
    const [error, setError] = useState('');
    const [formSubmitted, setFormSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setResponses(prevResponses => ({ ...prevResponses, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const prompt = `Ответь на русском языке. 
        Создай план путешествия по городу Гродно на ${responses.days} с бюджетом путешествия на человека ${responses.budget},
        для путешествия ${responses.withChildren},
         проживание ${responses.hotel},
         туристу  ${responses.historicalSites}  исторические памятники,
         туристу ${responses.culturalSites} посетить культурные памятники, 
         туристу ${responses.cafes}  завтракать и обедать в  кафе и ресторанах.

         Актуальные данные о заведениях, отелях и достопримечательностях города Гродно бери из яндекс карт.
       
        `;

        try {
            const res = await fetch("http://localhost:3001/api/chat", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message: prompt })
            });

            if (!res.ok) {
                throw new Error(`Server error: ${res.status}`);
            }

            const data = await res.text(); //  ответ в текст
            console.log('Server response:', data);  
            setResponse(data);
            setError('');
            setFormSubmitted(true);
        } catch (error) {
            console.error('Error:', error);
            setError('Failed to generate response');
        }
    };


    
    const handleDownloadTxt = () => {
        try {
            const blob = new Blob([response], { type: 'text/plain;charset=utf-8' });
            saveAs(blob, 'маршрут.txt');
        } catch (error) {
            console.error("Error:", error);
            setError("Failed to download TXT");
        }
    };


    const renderResponse = () => {
        const sentences = response.split(/[.*]/);
        return sentences.map((sentence, index) => (
            <p key={index}>{sentence.trim()}</p>
        ));
    };
    


    return (
        <div className='win'>
             <h2>Сгенерировать маршрут</h2>
             <p>Заполните форму ниже, чтобы наш ИИ сгенерировал для вас уникальный и интересный туристический маршрут.<br/> 
             Укажите свои предпочтения, длительность поездки и интересующие места. <br/>
             Получите план путешествия, созданный специально для вас!</p>
              {!formSubmitted ? (
                <div className="chat-form">
           
            <form onSubmit={handleSubmit}>
                <div className="question">
                    <label>Сколько дней планируете путешествовать?</label>
                    <select name="days" value={responses.days} onChange={handleChange}>
                        <option value="1 день">1 день</option>
                        <option value="2 дня">2 дня</option>
                        <option value="3 дня">3 дня</option>
                    </select>
                </div>
                <div className="question">
                    <label>Вы путешествуете с детьми?</label>
                    <select name="withChildren" value={responses.withChildren} onChange={handleChange}>
                        <option value="с детьми">С детьми</option>
                        <option value="без детей">Без детей</option>
                    </select>
                </div>
                <div className="question">
                    <label>Планируете жить в отеле?</label>
                    <select name="hotel" value={responses.hotel} onChange={handleChange}>
                        <option value=" необходимо спланировать в отеле(подбери отель)">В отеле</option>
                        <option value="не необходимости планировать">Не в отеле</option>
                    </select>
                </div>
                <div className="question">
                    <label>Желаете посетить исторические памятники?</label>
                    <select name="historicalSites" value={responses.historicalSites} onChange={handleChange}>
                        <option value="хотелось бы посетить">Посетить</option>
                        <option value="не хочется посещать">Не посещать</option>
                    </select>
                </div>
                <div className="question">
                    <label>Желаете посетить культурные памятники? (музеи, галереи, зоопарк)</label>
                    <select name="culturalSites" value={responses.culturalSites} onChange={handleChange}>
                        <option value="хотелось бы посетить">Посетить</option>
                        <option value="не хочется посещать">Не посещать</option>
                    </select>
                </div>
                <div className="question">
                    <label>Планируете посещать местные кафе и рестораны?</label>
                    <select name="cafes" value={responses.cafes} onChange={handleChange}>
                        <option value="нравится(посоветуй заведения)">Планирую</option>
                        <option value="не нравится">Не планирую</option>
                    </select>
                </div>
                <div className="question">
                    <label>Ваш бюджет?</label>
                    <select name="budget" value={responses.budget} onChange={handleChange}>
                        <option value="до $150 на человека">До $150</option>
                        <option value="от $150 до $250 на человека">От $150 до $250</option>
                        <option value="свыше $250 на человека">Свыше $250</option>
                    </select>
                </div>
                <button type="submit">Сгенерировать</button>
            </form>
            </div>            
              ):(
                <div>
                <div className="response-frame">
                    {renderResponse()}
                </div>
                {response && (
                    <button className="dowl" onClick={handleDownloadTxt}>Скачать программу маршрута</button>
                )}
            </div>
              )}
               {error && <div className="error">{error}</div>}
           </div>
    );
};

export default ChatForm;
