import chefImage from  "../chef-image.png"
export default function Header(){
    return(
       <header className="header-container">
         <img className="header-image" src={chefImage} alt="chef_image_icon" />
         <h2>Chef Claude </h2>
       </header>
        
      
        
    )
}