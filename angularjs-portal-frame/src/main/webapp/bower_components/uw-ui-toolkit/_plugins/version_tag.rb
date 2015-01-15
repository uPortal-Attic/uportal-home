require 'multi_json'

module Jekyll
  class UwUiToolkitVersion < Liquid::Tag
    def initialize(tag_name, text, tokens)
      super
      @text = text
    end

    def render(context)
      package["version"] || "0.0.0"
    end

    private
      def package
        @package ||= begin
          JSON.parse(File.open(File.expand_path('../../package.json', __FILE__)).read)
        rescue Exception => e
          {}
        end
      end
  end
end

Liquid::Template.register_tag('uw_ui_toolkit_version', Jekyll::UwUiToolkitVersion)