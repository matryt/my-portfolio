export const splitMultiLineText = (text: string) => {
   
    const lines = text
      .replace(/\\n/g, '\n')  // Remplacer les \n échappés
      .replace(/<br\s*\/?>/gi, '\n') 
      .split('\n')
      .filter(line => line.trim() !== ''); // Supprimer les lignes vides
  
    
    return lines.map((line: string, index: number) => (
      <p key={index}>{line.trim()}</p>
    ));
  };
