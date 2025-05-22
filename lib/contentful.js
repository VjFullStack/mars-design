import { createClient } from 'contentful';

// Helper function to parse string with line breaks into an array
const parseStringToArray = (str) => {
  if (!str) return [];
  if (Array.isArray(str)) return str;
  
  // Split by line breaks and filter out empty lines
  return str.split('\n')
    .map(line => line.trim())
    .filter(line => line.length > 0);
};

export const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});

export async function getTeamMembers() {
  const entries = await client.getEntries({
    content_type: 'teamMember',
    include: 2  // Include 2 levels of linked entries/assets
  });
  
  console.log('Contentful Team Data:', JSON.stringify(entries.items[0], null, 2));
  
  return entries.items.map(item => {
    // Extract image URL properly from Contentful
    let imageUrl = '';
    
    // Debug output to check the exact field names and structure
    console.log('Team member fields:', Object.keys(item.fields));
    
    if (item.fields.profileImage) {
      // First check if it's using the field name 'profileImage'
      console.log('Found profileImage:', item.fields.profileImage);
      imageUrl = item.fields.profileImage.fields?.file?.url || '';
    } else if (item.fields.image) {
      // Or check if it's using the field name 'image'
      console.log('Found image:', item.fields.image);
      imageUrl = item.fields.image.fields?.file?.url || '';
    }
    
    // Fix protocol-relative URLs (starting with //)
    if (imageUrl && imageUrl.startsWith('//')) {
      imageUrl = `https:${imageUrl}`;
      console.log('Fixed image URL:', imageUrl);
    }
    
    return {
      id: item.sys.id,
      name: item.fields.name || '',
      role: item.fields.role || '',
      bio: item.fields.bio || '',
      image: imageUrl || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      social: {
        linkedin: item.fields.social?.linkedin || '',
        email: item.fields.social?.email || '',
        instagram: item.fields.social?.instagram || ''
      },
      specialties: Array.isArray(item.fields.specialties) ? item.fields.specialties : [],
    };
  });
}

export async function getJobOpenings() {
  const entries = await client.getEntries({
    content_type: 'jobOpening',
    include: 2  // Include 2 levels of linked entries/assets
  });
  
  console.log('Contentful Job Data:', JSON.stringify(entries.items[0]?.fields, null, 2));
  
  return entries.items.map(item => {
    // Handle location field which might be a geo object
    let locationValue = '';
    if (item.fields.location) {
      if (typeof item.fields.location === 'object' && item.fields.location.lat && item.fields.location.lon) {
        // It's a geo coordinate object, convert to string
        locationValue = item.fields.locationName || 'Remote';
      } else if (typeof item.fields.location === 'string') {
        // It's already a string
        locationValue = item.fields.location;
      }
    }
    
    return {
      id: item.sys.id,
      title: item.fields.title || '',
      location: locationValue,
      type: item.fields.type || '',
      description: item.fields.description || '',
      // Parse requirements and benefits from string to array
      requirements: parseStringToArray(item.fields.requirements),
      benefits: parseStringToArray(item.fields.benefits),
    };
  });
}

export async function getProjects() {
  const entries = await client.getEntries({
    content_type: 'project',
    include: 2  // Include 2 levels of linked entries/assets
  });
  
  return entries.items.map(item => {
    // Handle location field which might be a geo object
    let locationValue = '';
    if (item.fields.location) {
      if (typeof item.fields.location === 'object' && item.fields.location.lat && item.fields.location.lon) {
        // It's a geo coordinate object, convert to string
        locationValue = item.fields.locationName || item.fields.city || 'Location Unavailable';
      } else if (typeof item.fields.location === 'string') {
        // It's already a string
        locationValue = item.fields.location;
      }
    }
    
    // Process images to ensure they have proper URLs
    const processedImages = Array.isArray(item.fields.images) 
      ? item.fields.images.map(image => {
          let url = image?.fields?.file?.url || '';
          if (url && url.startsWith('//')) {
            url = `https:${url}`;
          }
          return url;
        }) 
      : [];
    
    // Process featured image URL
    let featuredImageUrl = item.fields.featuredImage?.fields?.file?.url || '';
    if (featuredImageUrl && featuredImageUrl.startsWith('//')) {
      featuredImageUrl = `https:${featuredImageUrl}`;
    }
    
    return {
      id: item.sys.id,
      title: item.fields.title || '',
      category: item.fields.category || '',
      description: item.fields.description || '',
      location: locationValue,
      images: processedImages,
      featuredImage: featuredImageUrl || 'https://images.unsplash.com/photo-1600210492493-0946911123ea?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      featured: !!item.fields.featured,
    };
  });
}
