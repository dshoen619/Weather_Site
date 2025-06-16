import json

# Load your original JSON file
with open("json/city.list.json", "r", encoding="utf-8") as f:
    data = json.load(f)

# Create a new list with only city and country
simplified = [{"city": entry["name"], "country": entry["country"], "id": entry["id"]} for entry in data]

# Save the result to a new file
with open("city_country_list.json", "w", encoding="utf-8") as f:
    json.dump(simplified, f, ensure_ascii=False, indent=2)

