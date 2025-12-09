export const scrollToSection = (sectionId: string, event?: React.MouseEvent) => {
  if (event) {
    event.preventDefault();
  }
  
  // Remove the # from sectionId if it exists
  const id = sectionId.startsWith('#') ? sectionId.substring(1) : sectionId;
  
  // Find the element to scroll to
  const element = document.getElementById(id);
  
  if (element) {
    // Update URL without the hash
    window.history.pushState({}, '', `/${id === 'home' ? '' : id}`);
    
    // Scroll to the section smoothly
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }
};