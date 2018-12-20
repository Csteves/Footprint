UPDATE footprint_material_category as mc
SET price = $1, price_change = $2
WHERE material_name = $3
returning*;