class Application
  def call(env)
    status  = 200
    headers = { "Content-Type" => "text/html" }
    body    = ["Hello world"]

    [status, headers, body]
  end
end

run Application.new
