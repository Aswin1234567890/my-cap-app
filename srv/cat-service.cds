using my.saree as my from '../db/schema';

service CatalogService{


@requires:'Admin'

    entity Sarees as projection on my.Saree;
}