json.array!(@nodes) do |node|
  json.extract! node, :id, :text, :position, :diagram_id, :help_text, :parent_id
  json.url node_url(node, format: :json)
end
