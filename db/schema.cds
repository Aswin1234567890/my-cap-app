namespace my.saree;

entity Saree{

    key ID:UUID;//it generates a random unique id 
    Name:String;
    Price:Integer;
    Description:String;
    Stock:Integer;
    Status:String;
    @Core.IsURL
    @UI.IsImageURL
    Url: String;
}

