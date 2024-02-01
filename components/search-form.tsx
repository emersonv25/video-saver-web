'use client'
import { Button } from '@nextui-org/button'
import React, { useState } from 'react'
import { Input } from '@nextui-org/input'
import { IoMdSearch } from 'react-icons/io';
import CardInfo from './card-info';

export default function SearchForm() {
    const [url, setUrl] = useState('');
    const [error, setError] = useState('');
    const [videoInfo, setVideoInfo] = useState(null);

    const validateUrl = () => {
        const urlRegex = /^(https?:\/\/)?([\w.-]+)\.([a-z]{2,})(\/\S*)?$/i;
        return urlRegex.test(url);
    };
    const handleConsultarClick = async () => {
        if (validateUrl()) {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API}/video/info?url=${url}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    // body: JSON.stringify({ url: url }),
                });
                console.log(res)
                if (!res.ok) {
                    const errorData = await res.json();
                    throw new Error(`${errorData.message}`);
                }

                const data = await res.json();
                setVideoInfo(data);
                setError('');
            } catch (error) {
                setError(error.message);
            }
        } else {
            setError('Placa inválida');
        }
    };

    return (
        <>
            <div className="flex w-auto flex-wrap mb-6 md:mb-0 gap-4 justify-center">
                <Input
                    type="text"
                    placeholder="Informe o link do vídeo aqui"
                    style={{ textAlign: 'center' }}
                    className='md:w-96'
                    size='sm'
                    minLength={6}
                    value={url}
                    onChange={(data) =>
                        setUrl(data.currentTarget.value.trim())
                    }
                    startContent={<IoMdSearch />}
                />
                {error && <p className="text-red-500 w-full text-center">{error}</p>}
                <Button color="primary" size="lg" onClick={handleConsultarClick}>
                    Buscar
                </Button>
            </div>        
            {videoInfo && <CardInfo videoInfo={videoInfo}></CardInfo>}
        </>
    )
}