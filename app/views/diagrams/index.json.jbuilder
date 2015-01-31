json.array!(@diagrams) do |diagram|
  json.extract! diagram, :id, :name
  json.url diagram_url(diagram, format: :json)
end
