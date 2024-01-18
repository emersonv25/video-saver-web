'use client'
import { Button } from '@nextui-org/button'
import React, { useState } from 'react'
import { Input } from '@nextui-org/input'
import Link from 'next/link';
import { IoMdSearch } from 'react-icons/io';
import { useRouter } from 'next/navigation';

export default function SearchForm() {
    const [url, setUrl] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();
    
    const validateUrl = () => {
        const urlRegex = /^(https?:\/\/)?([\w.-]+)\.([a-z]{2,})(\/\S*)?$/i;
        return urlRegex.test(url);
    };

    const handleConsultarClick = () => {
        if (validateUrl()) {
            // router.push(`placa/${url}`);
            console.log('valido')
        } else {
            setError('Placa inválida');
        }
    };

    return (
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
    )
}
