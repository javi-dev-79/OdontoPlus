import { useState } from 'react'
import { Box, Image, Heading, Text, Button } from '@chakra-ui/react'
import { ServiceCardProps } from '@/types/ServiceCardProps'

const ServiceCard = ({
  imageUrl,
  hoverImageUrl,
  title,
  description,
  moreInfoUrl
}: ServiceCardProps) => {
  const [imageHovered, setImageHovered] = useState(false)

  return (
    <Box
      display='flex'
      flexDirection='column'
      alignItems='center'
      justifyContent='center'
      borderWidth='1px'
      borderRadius='15px'
      overflow='hidden'
      bg={'#4C5C5A'}
      transition='background-color 0.3s ease'
      maxWidth='350px'
      width='100%'
      height='100%'
    >
      <Box position='relative' width='100%' height='200px' mb='8px' p={4}>
        {' '}
        <Image
          src={imageHovered ? hoverImageUrl : imageUrl}
          alt={title}
          objectFit='cover'
          width='100%'
          height='100%'
          borderRadius='10px'
          onMouseEnter={() => setImageHovered(true)}
          onMouseLeave={() => setImageHovered(false)}
        />
      </Box>

      <Box
        display='flex'
        flexDirection='column'
        justifyContent='space-between'
        mb={6}
        flex='1'
        height='100%'
      >
        <Heading
          size='md'
          fontFamily='Roboto, sans-serif'
          fontWeight='bold'
          textAlign='center'
          color='white'
          mb={2}
        >
          {title}
        </Heading>
        <Text
          fontSize='16px'
          fontFamily='Roboto, sans-serif'
          color='white'
          textAlign='center'
          flex='1'
          minHeight='60px'
          mb={4}
        >
          {description}
        </Text>
        <Box display='flex' justifyContent='center' width='100%'>
          <Button
            as='a'
            href={moreInfoUrl}
            color='#333333'
            bg='white'
            variant='outline'
            width='200px'
            size='sm'
            fontWeight='bold'
            borderRadius='10px'
            _hover={{
              bg: '#00796B',
              color: 'white'
            }}
            mt={-4}
          >
            Más información
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

export default ServiceCard








